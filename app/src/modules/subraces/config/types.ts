import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  SubracesRepository: Symbol.for('SubracesRepository'),
  GetSubracesController: Symbol.for('GetSubracesController'),
};
