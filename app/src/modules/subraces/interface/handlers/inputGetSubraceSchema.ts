import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetSubraceSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    subraceId: Joi.string().uuid().optional(),
  }).optional(),
};
