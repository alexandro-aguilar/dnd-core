import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  UsersRepository: Symbol.for('UsersRepository'),
  GetUsersController: Symbol.for('GetUsersController'),
  SyncUserOnSignupController: Symbol.for('SyncUserOnSignupController'),
};
