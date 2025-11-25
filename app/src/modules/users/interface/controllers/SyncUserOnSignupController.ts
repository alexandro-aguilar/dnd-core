import { PostConfirmationTriggerEvent } from 'aws-lambda';
import { inject, injectable } from 'inversify';
import ILogger from '@src/core/utils/ILogger';
import User from '../../domain/entities/User';
import UsersRepository from '../../domain/repositories/UsersRepository';
import { types } from '../../config/types';

const COGNITO_MANAGED_PASSWORD_HASH = 'cognito-managed';

@injectable()
export default class SyncUserOnSignupController {
  constructor(
    @inject(types.Logger) private readonly logger: ILogger,
    @inject(types.UsersRepository) private readonly usersRepository: UsersRepository
  ) {}

  async execute(event: PostConfirmationTriggerEvent): Promise<void> {
    const attributes = event.request.userAttributes || {};
    const userId = attributes.sub || event.userName;
    const email = attributes.email;
    const name = attributes.name || email || event.userName;

    if (!userId || !email || !name) {
      this.logger.error('Missing required Cognito attributes to sync user', { userId, email, name });
      throw new Error('Missing required Cognito attributes to sync user');
    }

    const user = new User(userId, email, name, COGNITO_MANAGED_PASSWORD_HASH);

    await this.usersRepository.create(user);
    this.logger.info('Synced Cognito user to database', { userId, email });
  }
}
