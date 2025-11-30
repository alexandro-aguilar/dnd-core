import { inject, injectable } from 'inversify';
import Session from '../domain/entities/Session';
import SessionRepository from '../domain/repositories/SessionRepository';
import { sessions as sessionsTable } from '@src/core/infrastructure/database/schema';
import { types } from '../config/types';
import ILogger from '@src/core/utils/ILogger';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { SessionStatus } from '../domain/dtos/SessionDto';

@injectable()
export default class DrizzleSessionRepository implements SessionRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  getById(id: string): Promise<Session | null> {
    this.logger.info('Fetching session by id', { id });
    throw new Error('Method not implemented.');
  }

  async create(session: Session): Promise<Session> {
    try {
      this.logger.info('Creating session in database', { sessionId: session.id });
      const [created] = await db
        .insert(sessionsTable)
        .values({
          id: session.id,
          dmId: session.dm as string,
          title: session.title,
          status: session.status,
          notes: session.notes,
          createdAt: session.createdAt,
          updatedAt: session.updatedAt,
        })
        .returning();

      return new Session(
        created.id,
        created.dmId,
        created.title,
        created.status as SessionStatus,
        created.notes,
        created.createdAt,
        created.updatedAt
      );
    } catch (error) {
      this.logger.error('Error creating session in database', { error });
      throw error;
    }
  }
}
