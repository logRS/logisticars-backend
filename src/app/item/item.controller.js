import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma.js";

// TODO: Created_at and updated_at must be timestamp auto-generated
class ItemController {
  async getById(req, res, next) {
    console.log("Caller", res.locals.payload); // just to see the payload

    try {
      const item = await prisma.item.findUnique({
        where: { id_item: req.params.id },
      });
      if (!item)
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Item não encontrado",
        });
      return res
        .status(StatusCodes.OK)
        .json(item);
    } catch (err) {
      console.error(err);
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }


 

  // edit item
  async editItem(req, res, next) {
    try {
      const item = await prisma.item.update({
        where: { id_item: req.params.id },
        data: { nome: req.body.nome, unidade_medida: req.body.unidade_medida, id_categoria: req.body.id_categoria },
      });
      if (!item)
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Item não encontrado",
        });
      return res
        .status(StatusCodes.OK)
        .json(item);
    } catch (err) {
      console.error(err);
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }
  addNew = async (req, res, next) => {
    const categoriaExistente = await verificaCategoriaExistente(req.body.id_categoria);
    try{
      if(!categoriaExistente){
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Categoria não encontrada",
        });
      }
    }catch(err){
      console.error(err);
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error 1",
      });
    }

    // adding the new item 
    try {
      const item = await prisma.item.create({
        data: { nome: req.body.nome, unidade_medida: req.body.unidade_medida, id_categoria: req.body.id_categoria},
      });
      if (!item)
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Categoria não adicionada",
        });
      return res
        .status(StatusCodes.OK)
        .json(item);
    } catch (err) {
      console.error(err);
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error 2",
      });
    }
  }

}

async function verificaCategoriaExistente(id_categoria) {
  // checking if the category exists
  return await prisma.categorias.findFirst({
     where: { id_categoria },
   }); 
 }

export default new ItemController();
