import { inject, injectable } from 'inversify';
import { races as racesTable } from '@src/core/infrastructure/database/schema';
import Race from '../../domain/entities/Race';
import RacesRepository from '../../domain/repositories/RacesRepository';
import { types } from '../../config/types';
import ILogger from '@src/core/utils/ILogger';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';

@injectable()
export default class DrizzleRacesRepository implements RacesRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Race>> {
    try {
      this.logger.info('Fetching all races from DrizzleRacesRepository');
      const results = await db.select().from(racesTable).execute();
      if (!results) return [];
      return results.map((result) => {
        return new Race(result.id, result.name, result.baseSpeed, result.size);
      });
    } catch (error) {
      this.logger.error('Error fetching races from database', { error });
      throw error;
    }
  }
}
