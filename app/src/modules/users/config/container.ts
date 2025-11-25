import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import UsersRepository from '../domain/repositories/UsersRepository';
import DrizzleUsersRepository from '../infrastructure/repositories/DrizzleUsersRepository';
import GetUsersController from '../interface/controllers/GetUsersController';
import SyncUserOnSignupController from '../interface/controllers/SyncUserOnSignupController';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<UsersRepository>(types.UsersRepository).to(DrizzleUsersRepository);
container.bind<GetUsersController>(types.GetUsersController).to(GetUsersController);
container.bind<SyncUserOnSignupController>(types.SyncUserOnSignupController).to(SyncUserOnSignupController);
