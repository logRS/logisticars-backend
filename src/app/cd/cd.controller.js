// Create controller to cd model, simmilar to item.controller but using the model cd from Prisma
// Must have all methods: getById, create, list, update, delete
import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma.js';
import logger from '../../lib/logger.js';

function findCd(id_cd) {
  return prisma.cd.findUnique({
    where: { id_cd },
  });
}
class CdController {
  async getById(req, res, next) {
    logger.child({ caller: res.caller }).info('CdController > getById() | Getting cd by id');
    const { id } = req.params;
    const cd = await prisma.cd.findUnique({
      where: { id_cd: id },
    });
    if (!cd)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Cd não encontrado',
      });
    return res.status(StatusCodes.OK).json(cd);
  }

  async create(req, res, next) {
    logger.child({ caller: res.caller }).info('CdController > create() | Creating new CD');
    const { descricao, endereco, nome, capacidade_armazenamento } = req.body;
    const cd = await prisma.cd.create({
      data: {
        descricao,
        endereco,
        nome,
        capacidade_armazenamento,
      },
    });
    if (!cd) {
      logger.warn('CdController > addNew() | CD not Created');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'CD não criado',
      });
    }
    return res.status(StatusCodes.CREATED).json(cd);
  }

  async list(_req, res, next) {
    logger.child({ caller: res.caller }).info('CdController > list() | Listing all CDs');
    const cds = await prisma.cd.findMany();
    if (!cds) {
      logger.warn('CdController > list() | CD not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'CDs não encontrados',
      });
    }
    return res.status(StatusCodes.OK).json(cds);
  }

  async update(req, res, next) {
    logger.child({ caller: res.caller }).info('CdController > update() | Updating CD');
    const { id } = req.params;
    const { descricao, endereco, nome, capacidade_armazenamento } = req.body;
    const cd = await prisma.cd.update({
      where: { id_cd: id },
      data: {
        descricao,
        endereco,
        nome,
        capacidade_armazenamento,
      },
    });
    if (!cd) {
      logger.warn('CdController > update() | CD not updated');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'CD não atualizado',
      });
    }
    return res.status(StatusCodes.OK).json(cd);
  }

  async delete(req, res, next) {
    logger.child({ caller: res.caller }).info('CdController > delete() | Deleting CD');
    const { id } = req.params;
    
    if(!await findCd(id)){
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'CD não encontrado',
      });
    }
    const cd = await prisma.cd.delete({
      where: { id_cd: id },
    });
    if (!cd) {
      logger.warn('CdController > delete() | CD not deleted');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'CD não deletado',
      });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  }
}

export default new CdController();
