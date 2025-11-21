import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  SpellsRepository: Symbol.for('SpellsRepository'),
  GetSpellsController: Symbol.for('GetSpellsController'),
};
