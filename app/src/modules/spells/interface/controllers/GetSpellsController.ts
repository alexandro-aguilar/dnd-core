import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import SpellsRepository from '../../domain/repositories/SpellsRepository';
import SpellDto from '../../domain/dtos/SpellDto';

@injectable()
export default class GetSpellsController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.SpellsRepository) private readonly spellsRepository: SpellsRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<SpellDto>>> {
    this.logger.info('Getting all spells');
    const spells = await this.spellsRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(spells.map((spell) => spell.toDto())) };
  }
}
