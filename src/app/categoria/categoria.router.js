import { Router } from "express";
import rescue from "express-rescue";
import categoriaController from "../categoria/categoria.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import categoriaValidation from "./categoria.validation.js";

const categoriaRouter = Router();

categoriaRouter
  .route("/")
  .post(
    categoriaValidation.addNew,
    authMiddleware,
    rescue(categoriaController.create)
  );

categoriaRouter
  .route("/:id")
  .get(
    categoriaValidation.getById,
    authMiddleware,
    rescue(categoriaController.getById)
  );

categoriaRouter
  .route("/:id")
  .put(
    categoriaValidation.update,
    authMiddleware,
    rescue(categoriaController.update)
  );

categoriaRouter
  .route("/")
  .get(
    categoriaValidation.list,
    authMiddleware,
    rescue(categoriaController.list)
  );

export default categoriaRouter;
