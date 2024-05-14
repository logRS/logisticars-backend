import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma.js';
import logger from '../../lib/logger.js';

async function findOrigem(id_origem) {
  return prisma.origem.findUnique({
    where: { id_origem },
  });
}

class OrigemController {
  async getById(req, res, next) {
    logger.child({ caller: res.caller }).info('OrigemController > getById() | Getting origem by id');
    const { id } = req.params;
    const origem = await findOrigem(id);
    if (!origem)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Origem não encontrada',
      });
    return res.status(StatusCodes.OK).json(origem);
  }

  async create(req, res, next) {
    logger.child({ caller: res.caller }).info('OrigemController > addNew() | Adding new origem');
    const { nome, cpf_cnpj, categoria } = req.body;
    const origem = await prisma.origem.create({
      data: {
        nome,
        cpf_cnpj,
        categoria,
      },
    });
    if (!origem) {
      logger.warn('OrigemController > addNew() | Origin not added');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Origem não adicionada',
      });
    }
    return res.status(StatusCodes.CREATED).json(origem);
  }

  async list(_req, res, next) {
    logger.child({ caller: res.caller }).info('OrigemController > list() | Listing all Origins');
    const origens = await prisma.origem.findMany();
    if(!origens){
      logger.warn('OrigemController > list() | Origin not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Origens não encontradas',
      });
    }
    return res.status(StatusCodes.OK).json(origens);
  }

  async update(req, res, next) {
    logger.child({ caller: res.caller }).info('OrigemController > update() | Updating origem');
    const { id } = req.params;
    const { nome, cpf_cnpj, categoria } = req.body;
    const origem = await prisma.origem.update({
      where: { id_origem: id },
      data: {
        nome,
        cpf_cnpj,
        categoria,
      },
    });
    if (!origem)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Origem não atualizada',
      });
    return res.status(StatusCodes.OK).json(origem);
  }

  async delete(req, res, next) {
    logger.child({ caller: res.caller }).info('OrigemController > delete() | Deleting origem');
    const { id } = req.params;
    const origem = await prisma.origem.delete({
      where: { id_origem: id },
    });
    if (!origem)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Origem não deletada',
      });
    return res.status(StatusCodes.NO_CONTENT).send();
  }
}

export default new OrigemController();