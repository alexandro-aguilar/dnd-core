import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetClassSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    classId: Joi.string().uuid().optional(),
  }).optional(),
};
