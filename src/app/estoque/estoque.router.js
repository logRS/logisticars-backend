import { Router } from 'express';
import rescue from 'express-rescue';
import authMiddleware from '../../middlewares/auth.middleware.js';
import estoqueController from './estoque.controller.js';
import estoqueValidation from './estoque.validation.js';

const estoqueRouter = Router();

estoqueRouter.route('/:id').get(estoqueValidation.getById, authMiddleware, rescue(estoqueController.getById));

estoqueRouter.route('/').post(estoqueValidation.upsert, authMiddleware, rescue(estoqueController.upsert));

estoqueRouter.route('/').get(estoqueValidation.list, authMiddleware, rescue(estoqueController.list));


export default estoqueRouter;