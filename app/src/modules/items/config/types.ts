import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  ItemsRepository: Symbol.for('ItemsRepository'),
  GetItemsController: Symbol.for('GetItemsController'),
};
