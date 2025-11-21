import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  SkillsRepository: Symbol.for('SkillsRepository'),
  GetSkillsController: Symbol.for('GetSkillsController'),
};
