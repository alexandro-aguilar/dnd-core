import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetCharacterSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    characterId: Joi.string().uuid().optional(),
  }).optional(),
};
