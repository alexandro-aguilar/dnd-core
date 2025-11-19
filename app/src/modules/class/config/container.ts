import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { Container } from 'inversify';
import { types } from './types';
import DrizzleClassRepository from '@src/modules/class/infrastructure/repositories/DrizzleClassRepository';
import ClassRepository from '../domain/repositories/ClassRepository';
import GetClassController from '../interface/controllers/GetClassController';

export const container = new Container();
container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<ClassRepository>(types.ClassRepository).to(DrizzleClassRepository);
container.bind<GetClassController>(types.GetClassController).to(GetClassController);
