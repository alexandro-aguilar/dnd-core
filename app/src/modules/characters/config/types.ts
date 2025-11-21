import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  CharactersRepository: Symbol.for('CharactersRepository'),
  GetCharactersController: Symbol.for('GetCharactersController'),
};
