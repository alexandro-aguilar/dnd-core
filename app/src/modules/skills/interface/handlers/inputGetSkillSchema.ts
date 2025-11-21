import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputGetSkillSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    skillId: Joi.string().uuid().optional(),
  }).optional(),
};
