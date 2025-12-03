import ILogger from '@src/core/utils/ILogger';
import { Container } from 'inversify';
import { types } from './types';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import PostQuestController from '../interface/controllers/PostQuestController';
import CreateQuestCommandHandler from '../application/handlers/CreateQuestCommandHandler';
import QuestRepository from '../domain/repositories/QuestRepository';
import DrizzleQuestRepository from '../infrastructure/DrizzleQuestRepository';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<PostQuestController>(types.PostQuestController).to(PostQuestController);
container.bind<CreateQuestCommandHandler>(types.CreateQuestCommandHandler).to(CreateQuestCommandHandler);
container.bind<QuestRepository>(types.QuestRepository).to(DrizzleQuestRepository);
