import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { characters as charactersTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import CharactersRepository from '../../domain/repositories/CharactersRepository';
import Character from '../../domain/entities/Character';
import { eq } from 'drizzle-orm';

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

  async getById(id: string): Promise<Character | null> {
    try {
      this.logger.info(`Fetching character with ID ${id} from DrizzleCharactersRepository`);
      const result = await db.select().from(charactersTable).where(eq(charactersTable.id, id)).execute();
      if (!result) return null;

      return new Character(
        result[0].id,
        result[0].userId,
        result[0].name,
        result[0].level,
        result[0].raceId,
        result[0].subraceId ?? null,
        result[0].backgroundId,
        result[0].alignment,
        result[0].experiencePoints,
        result[0].maxHitPoints,
        result[0].currentHitPoints,
        result[0].temporaryHitPoints,
        result[0].armorClass,
        result[0].speed,
        result[0].inspiration,
        result[0].personalityTraits ?? null,
        result[0].ideals ?? null,
        result[0].bonds ?? null,
        result[0].flaws ?? null
      );
    } catch (error) {
      this.logger.error(`Error fetching character with ID ${id} from database`, { error });
      throw error;
    }
  }

  async create(character: Character): Promise<Character> {
    try {
      this.logger.info('Creating new character in DrizzleCharactersRepository', { character });

      const [created] = await db
        .insert(charactersTable)
        .values({
          userId: character.user as string,
          name: character.name,
          level: character.level,
          raceId: character.race as string,
          subraceId: character.subrace as string,
          backgroundId: character.background as string,
          alignment: character.alignment,
          experiencePoints: character.experiencePoints,
          maxHitPoints: character.maxHitPoints,
          currentHitPoints: character.currentHitPoints,
          temporaryHitPoints: character.temporaryHitPoints,
          armorClass: character.armorClass,
          speed: character.speed,
          inspiration: character.inspiration,
          personalityTraits: character.personalityTraits,
          ideals: character.ideals,
          bonds: character.bonds,
          flaws: character.flaws,
        })
        .returning()
        .execute();

      return new Character(
        created.id,
        created.userId,
        created.name,
        created.level,
        created.raceId,
        created.subraceId ?? null,
        created.backgroundId,
        created.alignment,
        created.experiencePoints,
        created.maxHitPoints,
        created.currentHitPoints,
        created.temporaryHitPoints,
        created.armorClass,
        created.speed,
        created.inspiration,
        created.personalityTraits ?? null,
        created.ideals ?? null,
        created.bonds ?? null,
        created.flaws ?? null
      );
    } catch (error) {
      this.logger.error('Error creating new character in database', { error });
      throw error;
    }
  }
}
