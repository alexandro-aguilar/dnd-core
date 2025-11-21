import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { abilities as abilitiesTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import AbilitiesRepository from '../../domain/repositories/AbilitiesRepository';
import Ability from '../../domain/entities/Ability';

@injectable()
export default class PostgresAbilitiesRepository implements AbilitiesRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Ability>> {
    try {
      this.logger.info('Fetching all abilities from PostgresAbilitiesRepository');
      const results = await db.select().from(abilitiesTable).execute();
      if (!results) return [];

      return results.map((result) => new Ability(result.id, result.code, result.name));
    } catch (error) {
      this.logger.error('Error fetching abilities from database', { error });
      throw error;
    }
  }
}
