import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputPostSessionSchema: ValidatorSchemas = {
  pathParameters: Joi.object({
    dmId: Joi.string().uuid().optional(),
    title: Joi.string().optional(),
    status: Joi.string().valid('planned', 'in_progress', 'complete').optional(),
    notes: Joi.string().allow(null).optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
  }).optional(),
};
