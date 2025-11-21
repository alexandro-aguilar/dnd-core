import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import CharactersRepository from '../../domain/repositories/CharactersRepository';
import CharacterDto from '../../domain/dtos/CharacterDto';

@injectable()
export default class GetCharactersController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.CharactersRepository) private readonly charactersRepository: CharactersRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<CharacterDto>>> {
    this.logger.info('Getting all characters');
    const characters = await this.charactersRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(characters.map((character) => character.toDto())) };
  }
}
