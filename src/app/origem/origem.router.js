import { Router } from 'express';
import rescue from 'express-rescue';
import origemController from './origem.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import origemValidation from './origem.validation.js';

const origemRouter = Router();

origemRouter.route('/:id').get(origemValidation.getById, authMiddleware, rescue(origemController.getById));

origemRouter.route('/').post(origemValidation.create, authMiddleware, rescue(origemController.create));

origemRouter.route('/').get(origemValidation.list, authMiddleware, rescue(origemController.list));

origemRouter.route('/:id').put(origemValidation.update, authMiddleware, rescue(origemController.update));

origemRouter.route('/:id').delete(origemValidation.delete, authMiddleware, rescue(origemController.delete));

export default origemRouter;
