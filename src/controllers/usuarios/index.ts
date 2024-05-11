import type { Response } from 'express';
import createHttpError from 'http-errors';

import { AppDataSource } from '../../data-source';
import { validateCreateBody } from './validators';
import { Usuario } from './../../entities/all';
import { UsuarioCreateBody } from '../../types/routes/usuarios';

// TODO: Migrar tudo isso para o USUARIOS

// #swagger.tags = ['User']
// #swagger.description = 'Endpoint para obter um usuário.'
// #swagger.parameters['id'] = { description: 'ID do usuário.' }

/* #swagger.parameters['filtro'] = {
    in: 'query',
    description: 'Um filtro qualquer.',
    type: 'string'
} */
const create = async (req: TypedRequestBody<UsuarioCreateBody>, res: Response) => {
    // #swagger.tags = ['Usuario']
    // #swagger.description = 'Endpoint para obter um usuário.'
    // #swagger.parameters['id'] = { description: 'ID do usuário.' }

    /* #swagger.parameters['filtro'] = {
        in: 'query',
        description: 'Um filtro qualquer.',
        type: 'string'
    } */
    const { email, senha } = validateCreateBody(req.body);

    // Create a query runner to control the transactions, it allows to cancel the transaction if we need to
    const queryRunner = AppDataSource.createQueryRunner();

    // Connect the query runner to the database and start the transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const usuarioRepo = queryRunner.manager.getRepository(Usuario);
        const usernameExists = await usuarioRepo.exist({
            where: { email}
        });
        if (usernameExists) {
            throw createHttpError(409, 'Username already exists');
        }

        const emailExists = await usuarioRepo.exist({
            where: { email }
        });
        if (emailExists) {
            throw createHttpError(409, 'Email already exists');
        }

        const newUser = new Usuario();
        newUser.email = email;
        newUser.setPassword(senha);
        await queryRunner.manager.save(newUser);

        // No exceptions occured, so we commit the transaction
        await queryRunner.commitTransaction();

        res.send(newUser.id_usuario);
    } catch (err) {
        // As an exception occured, cancel the transaction
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        // We need to release the query runner to not keep a useless connection to the database
        await queryRunner.release();
    }
};

export default {
    create,
};
