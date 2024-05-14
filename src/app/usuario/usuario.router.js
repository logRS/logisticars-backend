import { Router } from "express";
import rescue from "express-rescue";
import usuarioController from "../usuario/usuario.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import userValidation from "./usuario.validation.js";

const usuarioRouter = Router();

usuarioRouter
  .route("/:id")
  .get(
    userValidation.getById,
    authMiddleware,
    rescue(usuarioController.getById),
  );

usuarioRouter
  .route("/:id")
  .patch(
    userValidation.getById,
    authMiddleware,
    rescue(usuarioController.editUserById),
  )

usuarioRouter
  .route("/:id")
  .delete(
    userValidation.getById,
    authMiddleware,
    rescue(usuarioController.deleteUserById),
  )

export default usuarioRouter;
