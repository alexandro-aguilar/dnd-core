import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  RacesRepository: Symbol.for('RacesRepository'),
  GetRacesController: Symbol.for('GetRacesController'),
};
