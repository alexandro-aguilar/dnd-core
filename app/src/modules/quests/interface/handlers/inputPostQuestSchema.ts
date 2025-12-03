import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputPostQuestSchema: ValidatorSchemas = {
  body: Joi.object({
    sessionId: Joi.string().uuid().required(),
    name: Joi.string().min(1).required(),
    status: Joi.string().valid('not_started', 'active', 'resolved', 'failed').required(),
    summary: Joi.string().allow('', null).optional(),
    hook: Joi.string().allow('', null).optional(),
    reward: Joi.string().allow('', null).optional(),
  }),
};
