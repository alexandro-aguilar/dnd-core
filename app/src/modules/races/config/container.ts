import ILogger from '@src/core/utils/ILogger';
import { Container } from 'inversify';
import { types } from './types';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import RacesRepository from '../domain/repositories/RacesRepository';
import GetRacesController from '../interface/controllers/GetRacesController';
import PostgresRacesRepository from '../infrastructure/repositories/PostgresRacesRepository';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<RacesRepository>(types.RacesRepository).to(PostgresRacesRepository);
container.bind<GetRacesController>(types.GetRacesController).to(GetRacesController);
