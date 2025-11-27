import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import Character from '../../domain/entities/Character';
import CharactersRepository from '../../domain/repositories/CharactersRepository';
import CreateCharacterCommand from '../commands/CreateCharacterCommand';
import { v7 as uuidv7 } from 'uuid';

@injectable()
export default class CreateCharacterCommandHandler {
  constructor(@inject(types.CharactersRepository) private charactersRepository: CharactersRepository) {}

  async execute(command: CreateCharacterCommand): Promise<Character> {
    const character = await this.charactersRepository.create(
      new Character(
        uuidv7(),
        command.userId,
        command.name,
        command.level,
        command.raceId,
        command.subraceId,
        command.backgroundId,
        command.alignment,
        command.experiencePoints,
        command.maxHitPoints,
        command.currentHitPoints,
        command.temporaryHitPoints,
        command.armorClass,
        command.speed,
        command.inspiration,
        command.personalityTraits,
        command.ideals,
        command.bonds,
        command.flaws
      )
    );
    return character;
  }
}
