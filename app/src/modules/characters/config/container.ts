import { Container } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import PowertoolsLoggerAdapter from '@src/core/utils/Logger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { types } from './types';
import CharactersRepository from '../domain/repositories/CharactersRepository';
import DrizzleCharactersRepository from '../infrastructure/repositories/DrizzleCharactersRepository';
import GetCharactersController from '../interface/controllers/GetCharactersController';
import GetCharacterByIdController from '../interface/controllers/GetCharacterByIdController';
import GetCharacterByIdQueryHandler from '../application/handlers/GetCharacterByIdQueryHandler';

export const container = new Container();

container.bind<ILogger>(types.Logger).to(PowertoolsLoggerAdapter).inSingletonScope();
container.bind<MetricsService>(types.MetricsService).to(MetricsService);
container.bind<TracerService>(types.TracerService).to(TracerService);
// region GetCharacters
container.bind<CharactersRepository>(types.CharactersRepository).to(DrizzleCharactersRepository);
container.bind<GetCharactersController>(types.GetCharactersController).to(GetCharactersController);
// endregion
//region GetCharacterById
container.bind<GetCharacterByIdController>(types.GetCharacterByIdController).to(GetCharacterByIdController);
container.bind<GetCharacterByIdQueryHandler>(types.GetCharacterByIdQueryHandler).to(GetCharacterByIdQueryHandler);
// endregion
