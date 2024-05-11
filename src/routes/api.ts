import express from 'express';
import 'express-async-errors';

import authRoutes from './auth';
import usersRoutes from './users';
import usuariosRoutes from './usuarios';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/usuarios', usuariosRoutes)
router.use('/users', usersRoutes);
router.route('/health').get((req, res) => res.send('Server is up!'));

export default router;