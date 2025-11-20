import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { subraces as subracesTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import Subrace from '../../domain/entities/Subrace';
import SubracesRepository from '../../domain/repositories/SubracesRepository';

@injectable()
export default class PostgresSubracesRepository implements SubracesRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Subrace>> {
    try {
      this.logger.info('Fetching all subraces from PostgresSubracesRepository');
      const results = await db.select().from(subracesTable).execute();
      if (!results) return [];

      return results.map((result) => new Subrace(result.id, result.raceId, result.name));
    } catch (error) {
      this.logger.error('Error fetching subraces from database', { error });
      throw error;
    }
  }
}
