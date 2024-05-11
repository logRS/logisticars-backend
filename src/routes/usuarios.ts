import express from 'express';

import UsuariosController from '../controllers/usuarios';

const router = express.Router();

router.route('/').post(UsuariosController.create);

export default router;