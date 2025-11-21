import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import AbilitiesRepository from '../domain/repositories/AbilitiesRepository';
import PostgresAbilitiesRepository from '../infrastructure/repositories/PostgresAbilitiesRepository';
import GetAbilitiesController from '../interface/controllers/GetAbilitiesController';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<AbilitiesRepository>(types.AbilitiesRepository).to(PostgresAbilitiesRepository);
container.bind<GetAbilitiesController>(types.GetAbilitiesController).to(GetAbilitiesController);
