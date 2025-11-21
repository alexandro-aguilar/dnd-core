import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetSpellSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    spellId: Joi.string().uuid().optional(),
  }).optional(),
};
