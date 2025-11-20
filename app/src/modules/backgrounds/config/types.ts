import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  BackgroundsRepository: Symbol.for('BackgroundsRepository'),
  GetBackgroundsController: Symbol.for('GetBackgroundsController'),
};
