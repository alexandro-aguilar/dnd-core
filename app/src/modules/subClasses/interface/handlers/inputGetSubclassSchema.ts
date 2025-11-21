import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetSubclassSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    subclassId: Joi.string().uuid().optional(),
  }).optional(),
};
