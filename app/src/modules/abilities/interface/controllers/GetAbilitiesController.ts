import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import AbilitiesRepository from '../../domain/repositories/AbilitiesRepository';
import AbilityDto from '../../domain/dtos/AbilityDto';

@injectable()
export default class GetAbilitiesController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.AbilitiesRepository) private readonly abilitiesRepository: AbilitiesRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<AbilityDto>>> {
    this.logger.info('Getting all abilities');
    const abilities = await this.abilitiesRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(abilities.map((ability) => ability.toDto())) };
  }
}
