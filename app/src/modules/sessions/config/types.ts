import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  PostSessionController: Symbol.for('PostSessionController'),
  CreateSessionCommandHandler: Symbol.for('CreateSessionCommandHandler'),
  SessionRepository: Symbol.for('SessionRepository'),
};
