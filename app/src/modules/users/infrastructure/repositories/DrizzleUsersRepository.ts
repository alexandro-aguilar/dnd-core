import { inject, injectable } from 'inversify';
import { eq } from 'drizzle-orm';
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

  async create(user: User): Promise<User> {
    this.logger.info('Creating user in database', { userId: user.id, email: user.email });
    const [createdUser] = await db
      .insert(usersTable)
      .values({
        id: user.id,
        email: user.email,
        name: user.name,
        passwordHash: user.passwordHash,
      })
      .onConflictDoNothing({ target: usersTable.email })
      .returning();

    if (!createdUser) {
      this.logger.warn('User already exists, skipping insert', { email: user.email });
      const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, user.email)).limit(1);
      if (existingUser) {
        return new User(existingUser.id, existingUser.email, existingUser.name, existingUser.passwordHash);
      }
      return user;
    }

    return new User(createdUser.id, createdUser.email, createdUser.name, createdUser.passwordHash);
  }
}
