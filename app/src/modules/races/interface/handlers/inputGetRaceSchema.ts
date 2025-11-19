import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetRaceSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    raceId: Joi.string().uuid().optional(),
  }).optional(),
};
