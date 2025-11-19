import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { classes as classesTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '@src/modules/class/config/types';
import Class from '@src/modules/class/domain/entities/Class';
import ClassesRepository from '@src/modules/class/domain/repositories/ClassesRepository';
import { inject, injectable } from 'inversify';

@injectable()
export default class PostgresClassesRepository implements ClassesRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Class>> {
    try {
      this.logger.info('Fetching all classes from PostgresClassesRepository');
      const results = await db.select().from(classesTable).execute();
      if (!results) return [];
      return results.map((result) => {
        return new Class(result.id, result.name, result.hitDie, result.primaryAbility, result.spellcastingAbility);
      });
    } catch (error) {
      this.logger.error('Error fetching classes from database', { error });
      throw error;
    }
  }
}
