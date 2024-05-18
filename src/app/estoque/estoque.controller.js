// Create controller to estoque model, simmilar to item.controller but using the model estoque from Prisma
// Must have all methods: getById, create, list, update, delete
import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma.js';
import logger from '../../lib/logger.js';

function findItemEstoque(id_item_estoque) {
  return prisma.item_estoque.findUnique({
    where: { id_item_estoque },
  });
}

class EstoqueController {
  async getById(req, res, next) {
    logger.child({ caller: res.caller }).info('EstoqueController > getById() | Getting Item no Estoque by id');
    const { id } = req.params;
    const itemEstoque = await findItemEstoque(id);
    if (!itemEstoque)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Item no Estoque não encontrado',
      });
    return res.status(StatusCodes.OK).json(itemEstoque);
  }

  async upsert(req, res, next) {
    logger.child({ caller: res.caller }).info('EstoqueController > create() | Creating new Item no Estoque');
    const { id_item, id_origem, id_localizacao, id_estoque, quantidade, tipo_operacao, validade } = req.body;

    const [item, origem, cd, localizacao_estoque] = await prisma.$transaction([
      prisma.item.findUnique({ where: { id_item } }),
      prisma.origem.findUnique({ where: { id_origem } }),
      prisma.cd.findUnique({ where: { id_cd: id_estoque } }),
      prisma.localizacao_estoque.findUnique({ where: { id_localizacao } }),
    ]);

    if (!item || !origem || !cd || !localizacao_estoque) {
      logger.warn('EstoqueController > create() | Item, Origem, Localizacao or Estoque not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Item, Origem, Localizacao ou Estoque não encontrado',
      });
    }

    const itemEstoqueExists = await prisma.item_estoque.findFirst({
      where: {
        id_item,
        id_origem,
        id_localizacao,
        id_estoque,
      },
    });

    if (itemEstoqueExists) {
      return await updateItemEstoque(itemEstoqueExists, quantidade, tipo_operacao, res, next);
    } else {
      return await createItemEstoque(id_item, id_estoque, id_origem, id_localizacao, quantidade, validade, tipo_operacao, res, next);
    }
  }

  async list(_req, res, next) {
    logger.child({ caller: res.caller }).info('EstoqueController > list() | Listing all Item no Estoque');
    const itemEstoque = await prisma.item_estoque.findMany();
    if (!itemEstoque) {
      logger.warn('EstoqueController > list() | Item no Estoque not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Item no Estoque não encontrado',
      });
    }
    return res.status(StatusCodes.OK).json(itemEstoque);
  }
}

async function updateItemEstoque(itemEstoqueExists, quantidade, tipo_operacao, res, next) {
  const newQuantity = itemEstoqueExists.quantidade + quantidade;
  const updatedItemEstoque = await prisma.item_estoque.update({
    where: { id_item_estoque: itemEstoqueExists.id_item_estoque },
    data: { quantidade: tipo_operacao === 'E' ? newQuantity : itemEstoqueExists.quantidade - quantidade },
  });

  await prisma.registro_estoque.create({
    data: {
      id_item_estoque: itemEstoqueExists.id_item_estoque,
      quantidade,
      operacao: tipo_operacao,
    },
  });
  return res.status(StatusCodes.OK).json(updatedItemEstoque);
}

async function createItemEstoque(id_item, id_estoque, id_origem, id_localizacao, quantidade, validade, tipo_operacao, res, next) {
  const itemEstoque = await prisma.item_estoque.create({
    data: {
      id_item,
      id_estoque,
      id_origem,
      id_localizacao,
      quantidade,
      validade,
    },
  });

  await prisma.registro_estoque.create({
    data: {
      id_item_estoque: itemEstoque.id_item_estoque,
      quantidade,
      operacao: tipo_operacao,
    },
  });
  if (!itemEstoque) {
    logger.warn('EstoqueController > create() | Item no Estoque not created');
    return next({
      status: StatusCodes.NOT_FOUND,
      message: 'Item no Estoque não criado',
    });
  }
  return res.status(StatusCodes.CREATED).json(itemEstoque);
}

export default new EstoqueController();
