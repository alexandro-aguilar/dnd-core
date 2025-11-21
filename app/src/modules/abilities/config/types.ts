import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  AbilitiesRepository: Symbol.for('AbilitiesRepository'),
  GetAbilitiesController: Symbol.for('GetAbilitiesController'),
};
