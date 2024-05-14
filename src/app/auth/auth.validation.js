import { Joi, Segments, celebrate } from "celebrate";

export default {
  login: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      senha: Joi.string().min(8).required(),
    }),
  }),
  register: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      senha: Joi.string().min(8).required(),
      nome: Joi.string().required(),
      tipo_usuario: Joi.string()
        .valid("admin", "gestor", "coordenador")
        .required(),
    }),
  }),
};
