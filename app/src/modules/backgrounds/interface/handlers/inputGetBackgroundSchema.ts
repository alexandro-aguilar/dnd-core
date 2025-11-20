import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetBackgroundSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    backgroundId: Joi.string().uuid().optional(),
  }).optional(),
};
