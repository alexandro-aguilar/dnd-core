import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import SubclassesRepository from '../domain/repositories/SubclassesRepository';
import DrizzleSubclassesRepository from '../infrastructure/repositories/DrizzleSubclassesRepository';
import GetSubclassesController from '../interface/controllers/GetSubclassesController';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<SubclassesRepository>(types.SubclassesRepository).to(DrizzleSubclassesRepository);
container.bind<GetSubclassesController>(types.GetSubclassesController).to(GetSubclassesController);
