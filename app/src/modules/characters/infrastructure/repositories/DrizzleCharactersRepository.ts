import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { characters as charactersTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import CharactersRepository from '../../domain/repositories/CharactersRepository';
import Character from '../../domain/entities/Character';

@injectable()
export default class DrizzleCharactersRepository implements CharactersRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Character>> {
    try {
      this.logger.info('Fetching all characters from DrizzleCharactersRepository');
      const results = await db.select().from(charactersTable).execute();
      if (!results) return [];

      return results.map(
        (result) =>
          new Character(
            result.id,
            result.userId,
            result.name,
            result.level,
            result.raceId,
            result.subraceId ?? null,
            result.backgroundId,
            result.alignment,
            result.experiencePoints,
            result.maxHitPoints,
            result.currentHitPoints,
            result.temporaryHitPoints,
            result.armorClass,
            result.speed,
            result.inspiration,
            result.personalityTraits ?? null,
            result.ideals ?? null,
            result.bonds ?? null,
            result.flaws ?? null
          )
      );
    } catch (error) {
      this.logger.error('Error fetching characters from database', { error });
      throw error;
    }
  }
}
