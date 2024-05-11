import createHttpError from 'http-errors';
import isEmail from 'validator/lib/isEmail';

import { UsuarioCreateBody } from '../../types/routes/usuarios';

export const validateCreateBody = (body: Partial<UsuarioCreateBody>) => {
    const { email, senha } = body;

    if (!email) {
        throw createHttpError(400, 'Email é necessário');
    }
    if (email.length < 5) {
        throw createHttpError(400, 'Email deve conter ao menos 5 carácteres');
    }

    if (!email) {
        throw createHttpError(400, 'Email é necessário');
    }
    if (!isEmail(email)) {
        throw createHttpError(400, 'Email inválido');
    }

    if (!senha) {
        throw createHttpError(400, 'Senha é necessária');
    }
    if (senha.length < 8) {
        throw createHttpError(400, 'Senha deve conter ao menos 8 carácteres');
    }

    // As the function checked the properties are not missing,
    // return the body as original type
    return body as UsuarioCreateBody;
};