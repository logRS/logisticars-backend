// Create Validation Schema to Ponto de Entrega model, simmilar to item.validation but using the Model ponto_entrega
import { celebrate, Joi, Segments } from 'celebrate';

export default {
  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),

  upsert: celebrate({
    [Segments.BODY]: Joi.object().keys({
      id_item_estoque: Joi.string().uuid(),
      id_item: Joi.string().uuid().required(),
      id_origem: Joi.string().uuid().required(),
      id_localizacao: Joi.string().uuid().required(),
      id_estoque: Joi.string().uuid().required(),
      quantidade: Joi.number().integer().required(),
      tipo_operacao: Joi.string().max(1).required(),
      validade: Joi.date().required(),
    }),
  }),

  list: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1),
    }),
  }),
};
