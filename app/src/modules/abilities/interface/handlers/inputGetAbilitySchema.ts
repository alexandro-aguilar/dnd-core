import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetAbilitySchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    abilityId: Joi.string().uuid().optional(),
  }).optional(),
};
