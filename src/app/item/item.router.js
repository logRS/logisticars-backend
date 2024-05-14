import { Router } from "express";
import rescue from "express-rescue";
import itemController from "../item/item.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import itemValidation from "./item.validation.js";

const itemRouter = Router();


itemRouter
  .route("/:id")
  .get(
    itemValidation.getById,
    authMiddleware,
    rescue(itemController.getById),
  );

itemRouter
  .route("/")
  .post(
    itemValidation.addNew,
    authMiddleware,
    rescue(itemController.addNew),
  );

  

export default itemRouter;
