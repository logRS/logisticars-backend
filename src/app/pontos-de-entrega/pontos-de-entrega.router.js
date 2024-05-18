//Create Ponto de Entrega router to handle requests to Ponto de Entrega Controller
import { Router } from 'express';
import rescue from 'express-rescue';
import authMiddleware from '../../middlewares/auth.middleware.js';
import pontosDeEntregaController from './pontos-de-entrega.controller.js';
import pontosDeEntregaValidation from './pontos-de-entrega.validation.js';

const pontosDeEntregaRouter = Router();

pontosDeEntregaRouter.route('/:id').get(pontosDeEntregaValidation.getById, authMiddleware, rescue(pontosDeEntregaController.getById));

pontosDeEntregaRouter.route('/').post(pontosDeEntregaValidation.create, authMiddleware, rescue(pontosDeEntregaController.create));

pontosDeEntregaRouter.route('/').get(pontosDeEntregaValidation.list, authMiddleware, rescue(pontosDeEntregaController.list));

pontosDeEntregaRouter.route('/:id').put(pontosDeEntregaValidation.update, authMiddleware, rescue(pontosDeEntregaController.update));

pontosDeEntregaRouter.route('/:id').delete(pontosDeEntregaValidation.delete, authMiddleware, rescue(pontosDeEntregaController.delete));

export default pontosDeEntregaRouter;