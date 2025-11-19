import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  Logger: Symbol.for('Logger'),
  MetricsService: Symbol.for('MetricsService'),
  TracerService: Symbol.for('TracerService'),
  ClassesRepository: Symbol.for('ClassesRepository'),
  GetClassesController: Symbol.for('GetClassesController'),
};
