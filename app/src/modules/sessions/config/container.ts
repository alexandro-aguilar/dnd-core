import ILogger from '@src/core/utils/ILogger';
import { Container } from 'inversify';
import { types } from './types';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import PostSessionController from '../interface/controllers/PostSessionController';
import CreateSessionCommandHandler from '../application/handlers/CreateSessionCommandHandler';
import SessionRepository from '../domain/repositories/SessionRepository';
import DrizzleSessionRepository from '../infrastructure/DrizzleSessionRepository';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<PostSessionController>(types.PostSessionController).to(PostSessionController);
container.bind<CreateSessionCommandHandler>(types.CreateSessionCommandHandler).to(CreateSessionCommandHandler);
container.bind<SessionRepository>(types.SessionRepository).to(DrizzleSessionRepository);
