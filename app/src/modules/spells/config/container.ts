import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import SpellsRepository from '../domain/repositories/SpellsRepository';
import DrizzleSpellsRepository from '../infrastructure/repositories/DrizzleSpellsRepository';
import GetSpellsController from '../interface/controllers/GetSpellsController';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
container.bind<SpellsRepository>(types.SpellsRepository).to(DrizzleSpellsRepository);
container.bind<GetSpellsController>(types.GetSpellsController).to(GetSpellsController);
