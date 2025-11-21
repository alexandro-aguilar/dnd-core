import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { spells as spellsTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import SpellsRepository from '../../domain/repositories/SpellsRepository';
import Spell from '../../domain/entities/Spell';

@injectable()
export default class PostgresSpellsRepository implements SpellsRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Spell>> {
    try {
      this.logger.info('Fetching all spells from PostgresSpellsRepository');
      const results = await db.select().from(spellsTable).execute();
      if (!results) return [];

      return results.map(
        (result) =>
          new Spell(
            result.id,
            result.name,
            result.level,
            result.school,
            result.castingTime,
            result.range,
            result.components,
            result.duration,
            result.concentration,
            result.description
          )
      );
    } catch (error) {
      this.logger.error('Error fetching spells from database', { error });
      throw error;
    }
  }
}
