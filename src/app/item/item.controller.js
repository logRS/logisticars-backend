import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma.js";
import logger from "../../lib/logger.js";

// TODO: Created_at and updated_at must be timestamp auto-generated
class ItemController {
  async getById(req, res, next) {
    logger
      .child({ caller: res.caller })
      .info("ItemController > getById() | Getting item by id");
    const { id } = req.params;
    const item = await findItem(id);
    if (!item)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: "Item não encontrado",
      });
    return res.status(StatusCodes.OK).json(item);
  }

  // edit item
  async editItem(req, res, next) {
    logger
      .child({ caller: res.caller })
      .info("ItemController > editItem() | Editing item by id");
    const item = await prisma.item.update({
      where: { id_item: req.params.id },
      data: {
        nome: req.body.nome,
        unidade_medida: req.body.unidade_medida,
        id_categoria: req.body.id_categoria,
      },
    });

    if (!item){
      logger.warn("ItemController > editItem() | Item not updated");
      return next({
        status: StatusCodes.NOT_FOUND,
        message: "Item não encontrado",
      });}

    return res.status(StatusCodes.OK).json(item);
  }

  async addNew(req, res, next) {
    logger
      .child({ caller: res.caller })
      .info("ItemController > addNew() | Adding new item");
    const { nome, unidade_medida, id_categoria } = req.body;
    const categoryExists = await findCategory(id_categoria);
    if (!categoryExists) {
      logger.warn("ItemController > addNew() | Category not found");
      return next({
        status: StatusCodes.NOT_FOUND,
        message: "Categoria não encontrada",
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
      logger.warn("ItemController > addNew() | Item not added");
      return next({
        status: StatusCodes.NOT_FOUND,
        message: "Item não adicionado",
      });
    }
    return res.status(StatusCodes.OK).json(item);
  }

  
}

async function findItem(id_item) {
  return await prisma.item.findUnique({
    where: { id_item },
  });
}

async function findCategory(id_categoria) {
  return await prisma.categorias.findFirst({
    where: { id_categoria },
  });
}

export default new ItemController();
