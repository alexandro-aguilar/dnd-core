import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  ClassesRepository: Symbol.for('ClassesRepository'),
  GetClassesController: Symbol.for('GetClassesController'),
};
