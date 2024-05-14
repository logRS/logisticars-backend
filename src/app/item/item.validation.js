import { Joi, Segments, celebrate } from 'celebrate';

export default {
  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),

  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().max(250).required(),
      unidade_medida: Joi.string().max(30).required(),
      id_categoria: Joi.string().uuid().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().max(250).required(),
      unidade_medida: Joi.string().max(30).required(),
      id_categoria: Joi.string().uuid().required(),
    }),
  }),
  list: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
};
