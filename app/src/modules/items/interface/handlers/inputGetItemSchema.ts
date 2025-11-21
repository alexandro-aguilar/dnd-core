import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetItemSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    itemId: Joi.string().uuid().optional(),
  }).optional(),
};
