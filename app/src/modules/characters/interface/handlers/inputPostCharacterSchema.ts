import Joi from '@hapi/joi';
import { ValidatorSchemas } from '@src/core/middleware/requestValidator';

export const inputPostCharacterSchema: ValidatorSchemas = {
  body: Joi.object({
    name: Joi.string().required(),
    level: Joi.number().integer().min(1).required(),
    raceId: Joi.string().uuid().required(),
    subraceId: Joi.string().uuid().required(),
    backgroundId: Joi.string().uuid().required(),
    alignment: Joi.string().required(),
    experiencePoints: Joi.number().integer().min(0).required(),
    maxHitPoints: Joi.number().integer().min(0).required(),
    currentHitPoints: Joi.number().integer().min(0).required(),
    temporaryHitPoints: Joi.number().integer().min(0).required(),
    armorClass: Joi.number().integer().min(0).required(),
    speed: Joi.number().integer().min(0).required(),
    inspiration: Joi.boolean().required(),
    personalityTraits: Joi.string().required(),
    ideals: Joi.string().required(),
    bonds: Joi.string().required(),
    flaws: Joi.string().required(),
  }).required(),
};
