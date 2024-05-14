import { Router } from 'express';
import rescue from 'express-rescue';
import itemController from './item.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import itemValidation from './item.validation.js';

const itemRouter = Router();

itemRouter.route('/:id').get(itemValidation.getById, authMiddleware, rescue(itemController.getById));

itemRouter.route('/').post(itemValidation.create, authMiddleware, rescue(itemController.create));

itemRouter.route('/').get(itemValidation.list, authMiddleware, rescue(itemController.list));

itemRouter.route('/:id').put(itemValidation.update, authMiddleware, rescue(itemController.update));

itemRouter.route('/:id').delete(itemValidation.delete, authMiddleware, rescue(itemController.delete));

export default itemRouter;
