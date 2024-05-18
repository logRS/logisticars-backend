// Create controller to ponto_entrega model, simmilar to item.controller but using the model ponto_entrega from Prisma
import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma.js';
import logger from '../../lib/logger.js';

class PontosDeEntregaController {
  async getById(req, res, next) {
    logger.child({ caller: res.caller }).info('PontosDeEntregaController > getById() | Getting ponto de entrega by id');
    const { id } = req.params;
    const pontoDeEntrega = await prisma.ponto_entrega.findUnique({
      where: { id_ponto_entrega: id },
    });
    if (!pontoDeEntrega)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Ponto de entrega não encontrado',
      });
    return res.status(StatusCodes.OK).json(pontoDeEntrega);
  }

  async create(req, res, next) {
    logger.child({ caller: res.caller }).info('PontosDeEntregaController > addNew() | Adding new ponto de entrega');
    const { nome, endereco, telefone, responsavel } = req.body;
    const pontoDeEntrega = await prisma.ponto_entrega.create({
      data: {
        nome,
        endereco,
        telefone,
        responsavel,
      },
    });
    if (!pontoDeEntrega) {
      logger.warn('PontosDeEntregaController > addNew() | Ponto de entrega not added');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Ponto de entrega não adicionado',
      });
    }
    return res.status(StatusCodes.CREATED).json(pontoDeEntrega);
  }

  async list(_req, res, next) {
    logger.child({ caller: res.caller }).info('PontosDeEntregaController > list() | Listing all Pontos de Entrega');
    const pontosDeEntrega = await prisma.ponto_entrega.findMany();
    if (!pontosDeEntrega) {
      logger.warn('PontosDeEntregaController > list() | Ponto de entrega not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Pontos de entrega não encontrados',
      });
    }
    return res.status(StatusCodes.OK).json(pontosDeEntrega);
  }

  async update(req, res, next) {
    logger.child({ caller: res.caller }).info('PontosDeEntregaController > update() | Updating ponto de entrega');
    const { id } = req.params;
    const { nome, endereco, telefone, responsavel } = req.body;
    const pontoDeEntrega = await prisma.ponto_entrega.update({
      where: { id_ponto_entrega: id },
      data: {
        nome,
        endereco,
        telefone,
        responsavel,
      },
    });
    if (!pontoDeEntrega) {
      logger.warn('PontosDeEntregaController > update() | Ponto de entrega not updated');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Ponto de entrega não atualizado',
      });
    }
    return res.status(StatusCodes.OK).json(pontoDeEntrega);
  }

  async delete(req, res, next) {
    logger.child({ caller: res.caller }).info('PontosDeEntregaController > delete() | Deleting ponto de entrega');
    const { id } = req.params;
    const pontoDeEntrega = await prisma.ponto_entrega.delete({
      where: { id_ponto_entrega: id },
    });
    if (!pontoDeEntrega) {
      logger.warn('PontosDeEntregaController > delete() | Ponto de entrega not deleted');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Ponto de entrega não deletado',
      });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  }
}

export default new PontosDeEntregaController();
