// Create Validation Schema to Ponto de Entrega model, simmilar to item.validation but using the Model ponto_entrega
import { celebrate, Joi, Segments } from 'celebrate';
// This is the validation schema for the model cd
// descricao                                                    String?                  @db.VarChar(255)
// endereco                                                     String?                  @db.VarChar(255)
// nome                                                         String?                  @db.VarChar(255)
// capacidade_armazenamento                                     String?                  @db.VarChar(255)

export default {
  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),

  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      descricao: Joi.string().max(255).required(),
      endereco: Joi.string().max(255).required(),
      nome: Joi.string().max(255).required(),
      capacidade_armazenamento: Joi.string().max(255).required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      descricao: Joi.string().max(255).required(),
      endereco: Joi.string().max(255).required(),
      nome: Joi.string().max(255).required(),
      capacidade_armazenamento: Joi.string().max(255).required(),
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