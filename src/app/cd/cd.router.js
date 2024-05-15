import { Router } from 'express';
import rescue from 'express-rescue';
import authMiddleware from '../../middlewares/auth.middleware.js';
import cdController from './cd.controller.js';
import cdValidation from './cd.validation.js';

const cdRouter = Router();

cdRouter.route('/:id').get(cdValidation.getById, authMiddleware, rescue(cdController.getById));

cdRouter.route('/').post(cdValidation.create, authMiddleware, rescue(cdController.create));

cdRouter.route('/').get(cdValidation.list, authMiddleware, rescue(cdController.list));

cdRouter.route('/:id').put(cdValidation.update, authMiddleware, rescue(cdController.update));

cdRouter.route('/:id').delete(cdValidation.delete, authMiddleware, rescue(cdController.delete));

export default cdRouter;