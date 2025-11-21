import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import ItemsRepository from '../domain/repositories/ItemsRepository';
import PostgresItemsRepository from '../infrastructure/repositories/PostgresItemsRepository';
import GetItemsController from '../interface/controllers/GetItemsController';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<ItemsRepository>(types.ItemsRepository).to(PostgresItemsRepository);
container.bind<GetItemsController>(types.GetItemsController).to(GetItemsController);
