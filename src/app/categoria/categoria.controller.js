import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma.js';
import logger from '../../lib/logger.js';

class CategoriaController {
  async list(_req, res, next) {
    logger
      .child({
        caller: res.caller,
      })
      .info('CategoriaController > list() | Listing categories');
    const categoria = await prisma.categorias.findMany();
    if (!categoria) {
      logger.warn('CategoriaController > list() | Category not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Erro ao listar categorias',
      });
    }
    return res.status(StatusCodes.OK).json(categoria);
  }

  async getById(req, res, next) {
    logger
      .child({
        caller: res.caller,
      })
      .info('CategoriaController > getById() | Getting category by id');
    const categoria = await prisma.categorias.findUnique({
      where: { id_categoria: req.params.id },
    });
    if (!categoria) {
      logger.warn('CategoriaController > getById() | Category not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Erro ao buscar categoria',
      });
    }
    return res.status(StatusCodes.OK).json(categoria);
  }

  async create(req, res, next) {
    logger
      .child({
        caller: res.caller,
      })
      .info('CategoriaController > addNew() | Adding new category');
    const categoria = await prisma.categorias.create({
      data: { nome: req.body.nome },
    });
    if (!categoria) {
      logger.warn('CategoriaController > addNew() | Category not added');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Categoria não adicionada',
      });
    }
    return res.status(StatusCodes.OK).json(categoria);
  }

  async update(req, res, next) {
    logger
      .child({
        caller: res.caller,
      })
      .info('CategoriaController > edit() | Editing category by id');
    const categoria = await prisma.categorias.update({
      where: { id_categoria: req.params.id },
      data: { nome: req.body.nome },
    });
    if (!categoria) {
      logger.warn('CategoriaController > edit() | Category not updated');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Categoria não atualizada',
      });
    }
    return res.status(StatusCodes.OK).json(categoria);
  }

  async delete(req, res, next) {
    logger
      .child({
        caller: res.caller,
      })
      .info('CategoriaController > delete() | Deleting category by id');
    const categoria = await prisma.categorias.findUnique({
      where: { id_categoria: req.params.id },
    });
    if (!categoria) {
      logger.warn('CategoriaController > delete() | Category not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Categoria não encontrada',
      });
    }
    await prisma.categorias.delete({
      where: {
        id_categoria: req.params.id,
      },
    });
    return res.status(StatusCodes.OK).json(categoria);
  }
}

export default new CategoriaController();
