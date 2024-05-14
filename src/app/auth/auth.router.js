import { Router } from "express";
import rescue from "express-rescue";
import authController from "../auth/auth.controller.js";
import authSchemaValidation from "./auth.validation.js";

const authRouter = Router();

authRouter
  .route("/login")
  .post(authSchemaValidation.login, rescue(authController.authenticate));
authRouter
  .route("/registrar")
  .post(authSchemaValidation.register, rescue(authController.register));

export default authRouter;
