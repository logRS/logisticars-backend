import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma.js';
import usuarioSerializer from './usuario.serializer.js';
import logger from '../../lib/logger.js';

class UserController {
  async getById(req, res, next) {
    logger.child({ caller: res.caller }).info('UsuarioController > getById() | Getting user by id');

    const user = await prisma.usuario.findUnique({
      where: { id_usuario: req.params.id },
    });

    if (!user) {
      logger.warn('UsuarioController > getById() | User not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Usuário não encontrado',
      });
    }
    return res.status(StatusCodes.OK).json(usuarioSerializer.serialize(user));
  }

  async editUserById(req, res, next) {
    logger.child({ caller: res.caller }).info('UsuarioController > editUserById() | Editing user by id');
    const usuario = await prisma.usuario.update({
      where: { id_usuario: req.params.id },
      data: { nome: req.body.nome, email: req.body.email },
    });
    if (!usuario) {
      logger.warn('UsuarioController > editUserById() | User not updated');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Usuario não atualizado',
      });
    }

    return res.status(StatusCodes.ACCEPTED).json(usuarioSerializer.serialize(usuario));
  }

  async deleteUserById(req, res, next) {
    logger.child({ caller: res.caller }).info('UsuarioController > deleteUserById() | Deleting user by id');

    const user = await prisma.usuario.findUnique({
      where: { id_usuario: req.params.id },
    });
    if (!user) {
      logger.warn('UsuarioController > deleteUserById() | User not found');
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Usuário não encontrado',
      });
    }

    await prisma.usuario.delete({
      where: {
        id_usuario: req.params.id,
      },
    });
    logger.info('UsuarioController > deleteUserById() | User deleted');
    return res.status(StatusCodes.ACCEPTED).json({
      id: req.params.id,
      message: `usuario ${req.params.id} deletado com sucesso.`,
    });
  }

  async getAll(_req, res) {
    logger.child({ caller: res.caller }).info('UsuarioController > getAll() | Getting all users');

    const users = await prisma.usuario.findMany({});

    return res.status(StatusCodes.OK).json(usuarioSerializer.serializeMany(users));
  }
}

export default new UserController();
