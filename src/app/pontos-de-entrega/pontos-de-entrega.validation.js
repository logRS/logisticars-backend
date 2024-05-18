// Create Validation Schema to Ponto de Entrega model, simmilar to item.validation but using the Model ponto_entrega
import { celebrate, Joi, Segments } from 'celebrate';
// model ponto_entrega {
//   id_ponto_entrega String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   endereco         String?   @db.VarChar(255)
//   responsavel      String?   @db.VarChar(255)
//   telefone         String?   @db.VarChar(255)
//   created_at       DateTime? @db.Date
//   updated_at       DateTime? @db.Date
//   demanda          demanda[]
//   pacote           pacote[]
// }

export default {
  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),

  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().max(255).required(),
      endereco: Joi.string().max(255).required(),
      responsavel: Joi.string().max(255).required(),
      telefone: Joi.string().max(255).required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().max(255).required(),
      endereco: Joi.string().max(255).required(),
      responsavel: Joi.string().max(255).required(),
      telefone: Joi.string().max(255).required(),
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