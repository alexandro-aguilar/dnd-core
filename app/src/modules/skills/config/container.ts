import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import SkillsRepository from '../domain/repositories/SkillsRepository';
import DrizzleSkillsRepository from '../infrastructure/repositories/DrizzleSkillsRepository';
import GetSkillsController from '../interface/controllers/GetSkillsController';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<SkillsRepository>(types.SkillsRepository).to(DrizzleSkillsRepository);
container.bind<GetSkillsController>(types.GetSkillsController).to(GetSkillsController);
