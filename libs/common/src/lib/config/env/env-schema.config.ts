import * as Joi from 'joi';

export const apiEnvSchema = {
  API_PORT: Joi.number().port().required(),
};

export const prismaEnvSchema = {
  PRISMA_DB: Joi.string().required(),
  PRISMA_HOST: Joi.string().hostname().required(),
  PRISMA_USER: Joi.string().required(),
  PRISMA_PASS: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
};

export const rmqEnvSchema = {
  RMQ_USER: Joi.string().required(),
  RMQ_PASS: Joi.string().required(),
  RMQ_HOST: Joi.string().hostname().required(),
  RMQ_UPDATE_QUEUE: Joi.string().required(),
  RMQ_USERS_QUEUE: Joi.string().required()
}

export default Joi.object({
  ...apiEnvSchema,
  ...prismaEnvSchema,
  ...rmqEnvSchema
});
