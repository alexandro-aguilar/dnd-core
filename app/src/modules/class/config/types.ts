import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  Logger: Symbol.for('Logger'),
  MetricsService: Symbol.for('MetricsService'),
  TracerService: Symbol.for('TracerService'),
  ClassRepository: Symbol.for('ClassRepository'),
  GetClassController: Symbol.for('GetClassController'),
};
