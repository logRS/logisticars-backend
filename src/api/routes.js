import { Router } from 'express';
import authRouter from '../app/auth/auth.router.js';
import userRouter from '../app/usuario/usuario.router.js';
import itemRouter from '../app/item/item.router.js';
import categoriaRouter from '../app/categoria/categoria.router.js';

const router = Router();

router.use('/usuarios', userRouter);
router.use('/auth', authRouter);
router.use('/itens', itemRouter);
router.use('/categorias', categoriaRouter);
export default router;
