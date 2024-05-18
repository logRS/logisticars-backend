import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma.js';
import logger from '../../lib/logger.js';

// TODO: Created_at and updated_at must be timestamp auto-generated
async function findItem(id_item) {
  return prisma.item.findUnique({
    where: { id_item },
  });
}

async function findCategory(id_categoria) {
  return prisma.categorias.findFirst({
    where: { id_categoria },
  });
}

class ItemController {
  async getById(req, res, next) {
    logger.child({ caller: res.caller }).info('ItemController > getById() | Getting item by id');
    const { id } = req.params;
    const item = await findItem(id);
    if (!item)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Item não encontrado',
      });
    return res.status(StatusCodes.OK).json(item);
  }

  async create(req, res, next) {
    logger.child({ caller: res.caller }).info('ItemController > addNew() | Adding new item');
    const { nome, unidade_medida, id_categoria } = req.body;
    const categoryExists = await findCategory(id_categoria);
    if (!categoryExists) {
      logger.warn('ItemController > addNew() | Category not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Categoria não encontrada',
      });
    }
    const item = await prisma.item.create({
      data: {
        nome,
        unidade_medida,
        id_categoria,
      },
    });
    if (!item) {
      logger.warn('ItemController > addNew() | Item not added');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Item não adicionado',
      });
    }
    return res.status(StatusCodes.CREATED).json(item);
  }

  async list(_req, res, next) {
    logger.child({ caller: res.caller }).info('ItemController > list() | Listing all items');
    const items = await prisma.item.findMany();
    if (!items) {
      logger.warn('ItemController > list() | No items found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Nenhum item encontrado',
      });
    }
    return res.status(StatusCodes.OK).json(items);
  }

  async delete(req, res, next) {
    logger.child({ caller: res.caller }).info('ItemController > delete() | Deleting item by id');
    const item = await prisma.item.findUnique({
      where: { id_item: req.params.id },
    });
    if (!item) {
      logger.warn('ItemController > delete() | Item not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Item não encontrado',
      });
    }
    await prisma.item.delete({
      where: { id_item: req.params.id },
    });
    return res.status(StatusCodes.NO_CONTENT).send();
  }

  async update(req, res, next) {
    logger.child({ caller: res.caller }).info('ItemController > update() | Updating item by id');
    const item = await prisma.item.update({
      where: { id_item: req.params.id },
      data: {
        nome: req.body.nome,
        unidade_medida: req.body.unidade_medida,
        id_categoria: req.body.id_categoria,
      },
    });
    if (!item) {
      logger.warn('ItemController > update() | Item not updated');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Item não atualizado',
      });
    }
    return res.status(StatusCodes.OK).json(item);
  }
}

export default new ItemController();
