import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { subclasses as subclassesTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import Subclass from '../../domain/entities/Subclass';
import SubclassesRepository from '../../domain/repositories/SubclassesRepository';

@injectable()
export default class PostgresSubclassesRepository implements SubclassesRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Subclass>> {
    try {
      this.logger.info('Fetching all subclasses from PostgresSubclassesRepository');
      const results = await db.select().from(subclassesTable).execute();
      if (!results) return [];

      return results.map((result) => new Subclass(result.id, result.classId, result.name, result.description));
    } catch (error) {
      this.logger.error('Error fetching subclasses from database', { error });
      throw error;
    }
  }
}
