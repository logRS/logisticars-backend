import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma.js";
import usuarioSerializer from "./usuario.serializer.js";

class UserController {
  async getById(req, res, next) {
    console.log("Caller", res.locals.payload); // just to see the payload

    try {
      const user = await prisma.usuario.findUnique({
        where: { id_usuario: req.params.id },
      });
      if (!user)
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Usuário não encontrado",
        });
      return res
        .status(StatusCodes.OK)
        .json({ nome: user.nome, email: user.email, tipo_usuario: user.tipo_usuario });
    } catch (err) {
      console.error(err);
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }

  async editUserById(req, res, next) {
    console.log("Caller", res.locals.payload); // just to see the payload

    try {
      const usuario = await prisma.usuario.update({
        where: { id_usuario: req.params.id },
        data: { nome: req.body.nome, email: req.body.email },
      });
      if (!usuario)
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Usuario não atualizado",
        });

      // const { senhaUsuario, ...objetoUsuario } = usuario;

      return res
        .status(StatusCodes.ACCEPTED)
        .json(usuarioSerializer.serialize(usuario));
    } catch(err) {
      console.error(err);
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Erro ao editar usuario.",
      });
    }
  }

  async deleteUserById(req, res, next) {
    console.log("Caller", res.locals.payload); // just to see the payload

    try{
      const user = await prisma.usuario.findUnique({
        where: { id_usuario: req.params.id },
      });
      if (!user)
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Usuário não encontrado",
        });

      await prisma.usuario.delete({
        where: {
          id_usuario: req.params.id
        }
      })

      return res
        .status(StatusCodes.ACCEPTED)
        .json({ id: req.params.id, message: `usuario ${req.params.id} deletado com sucesso.`}); 
    } catch (err) {
      console.error(err);
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Erro ao deletar usuario",
      });
    }
  }
}

export default new UserController();
