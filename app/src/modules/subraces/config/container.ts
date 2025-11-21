import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import SubracesRepository from '../domain/repositories/SubracesRepository';
import DrizzleSubracesRepository from '../infrastructure/repositories/DrizzleSubracesRepository';
import GetSubracesController from '../interface/controllers/GetSubracesController';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<SubracesRepository>(types.SubracesRepository).to(DrizzleSubracesRepository);
container.bind<GetSubracesController>(types.GetSubracesController).to(GetSubracesController);
