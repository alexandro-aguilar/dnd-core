import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import BackgroundsRepository from '../domain/repositories/BackgroundsRepository';
import DrizzleBackgroundsRepository from '../infrastructure/repositories/DrizzleBackgroundsRepository';
import GetBackgroundsController from '../interface/controllers/GetBackgroundsController';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<BackgroundsRepository>(types.BackgroundsRepository).to(DrizzleBackgroundsRepository);
container.bind<GetBackgroundsController>(types.GetBackgroundsController).to(GetBackgroundsController);
