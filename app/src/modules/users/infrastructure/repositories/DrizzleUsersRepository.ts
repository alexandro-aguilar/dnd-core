import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { users as usersTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import User from '../../domain/entities/User';
import UsersRepository from '../../domain/repositories/UsersRepository';

@injectable()
export default class DrizzleUsersRepository implements UsersRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}

  async listAll(): Promise<Array<User>> {
    this.logger.info('Fetching all users from database');
    const dbUsers = await db.select().from(usersTable);
    this.logger.info(`Found ${dbUsers.length} users`);

    return dbUsers.map((user) => new User(user.id, user.email, user.name, user.passwordHash));
  }
}
