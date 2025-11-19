import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import RacesRepository from '../../domain/repositories/RacesRepository';
import Logger from '@src/core/utils/Logger';
import RaceDto from '../../domain/dtos/RaceDto';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';

@injectable()
export default class GetRacesController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.RacesRepository) private readonly racesRepository: RacesRepository
  ) {}
  async execute(): Promise<APIGatewayProxyResultV2<Array<RaceDto>>> {
    this.logger.info('Getting all races');
    const races = await this.racesRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(races.map((race) => race.toDto())) };
  }
}
