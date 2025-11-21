import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { backgrounds as backgroundsTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import Background from '../../domain/entities/Background';
import BackgroundsRepository from '../../domain/repositories/BackgroundsRepository';

@injectable()
export default class DrizzleBackgroundsRepository implements BackgroundsRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Background>> {
    try {
      this.logger.info('Fetching all backgrounds from DrizzleBackgroundsRepository');
      const results = await db.select().from(backgroundsTable).execute();
      if (!results) return [];

      return results.map((result) => new Background(result.id, result.name, result.feature));
    } catch (error) {
      this.logger.error('Error fetching backgrounds from database', { error });
      throw error;
    }
  }
}
