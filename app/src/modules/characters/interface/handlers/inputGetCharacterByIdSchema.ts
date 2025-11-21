import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetCharacterByIdSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    characterId: Joi.string().uuid().required(),
  }).required(),
};
