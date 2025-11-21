import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import ILogger from '@src/core/utils/ILogger';
import CharacterByIdQuery from '../queries/CharacterByIdQuery';
import Character from '../../domain/entities/Character';
import CharactersRepository from '../../domain/repositories/CharactersRepository';
import NotFoundException from '@src/core/domain/exceptions/NotFoundException';

@injectable()
export default class GetCharacterByIdQueryHandler {
  constructor(
    @inject(types.Logger) private readonly logger: ILogger,
    @inject(types.CharactersRepository) private readonly charactersRepository: CharactersRepository
  ) {}

  async execute(query: CharacterByIdQuery): Promise<Character> {
    this.logger.info(`Handling GetCharacterById for ID: ${query.id}`);
    const character = await this.charactersRepository.getById(query.id);
    if (!character) {
      throw new NotFoundException(`Character with ID ${query.id} not found`);
    }
    return character;
  }
}
