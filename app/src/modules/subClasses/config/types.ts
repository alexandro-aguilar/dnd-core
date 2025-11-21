import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  SubclassesRepository: Symbol.for('SubclassesRepository'),
  GetSubclassesController: Symbol.for('GetSubclassesController'),
};
