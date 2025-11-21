import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { skills as skillsTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import SkillsRepository from '../../domain/repositories/SkillsRepository';
import Skill from '../../domain/entities/Skill';

@injectable()
export default class PostgresSkillsRepository implements SkillsRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Skill>> {
    try {
      this.logger.info('Fetching all skills from PostgresSkillsRepository');
      const results = await db.select().from(skillsTable).execute();
      if (!results) return [];

      return results.map((result) => new Skill(result.id, result.name, result.abilityId));
    } catch (error) {
      this.logger.error('Error fetching skills from database', { error });
      throw error;
    }
  }
}
