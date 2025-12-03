import { inject, injectable } from 'inversify';
import Quest from '../domain/entities/Quest';
import QuestRepository from '../domain/repositories/QuestRepository';
import { quests as questsTable } from '@src/core/infrastructure/database/schema';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../config/types';
import { QuestStatus } from '../domain/dtos/QuestDto';

@injectable()
export default class DrizzleQuestRepository implements QuestRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}

  getById(id: string): Promise<Quest | null> {
    this.logger.info('Fetching quest by id', { id });
    throw new Error('Method not implemented.');
  }

  async create(quest: Quest): Promise<Quest> {
    try {
      this.logger.info('Creating quest in database', { questId: quest.id });
      const [created] = await db
        .insert(questsTable)
        .values({
          id: quest.id,
          sessionId: quest.sessionId,
          name: quest.name,
          summary: quest.summary,
          status: quest.status,
          hook: quest.hook,
          reward: quest.reward,
          createdAt: quest.createdAt,
          updatedAt: quest.updatedAt,
        })
        .returning();

      return new Quest(
        created.id,
        created.sessionId,
        created.name,
        created.status as QuestStatus,
        created.summary,
        created.hook,
        created.reward,
        created.createdAt,
        created.updatedAt
      );
    } catch (error) {
      this.logger.error('Error creating quest in database', { error });
      throw error;
    }
  }
}
