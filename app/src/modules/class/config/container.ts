import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { Container } from 'inversify';
import { types } from './types';
import ClassesRepository from '../domain/repositories/ClassesRepository';
import GetClassesController from '../interface/controllers/GetClassesController';
import PostgresClassesRepository from '@src/modules/class/infrastructure/repositories/PostgresClassesRepository';

export const container = new Container();
container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<ClassesRepository>(types.ClassesRepository).to(PostgresClassesRepository);
container.bind<GetClassesController>(types.GetClassesController).to(GetClassesController);
