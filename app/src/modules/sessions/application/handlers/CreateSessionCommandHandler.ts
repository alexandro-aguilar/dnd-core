import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import SessionRepository from '../../domain/repositories/SessionRepository';
import ILogger from '@src/core/utils/ILogger';
import CreateSessionCommand from '../commands/CreateSessionCommand';
import Session from '../../domain/entities/Session';
import { SessionStatus } from '../../domain/dtos/SessionDto';
import { v7 as uuidv7 } from 'uuid';

@injectable()
export default class CreateSessionCommandHandler {
  constructor(
    @inject(types.Logger) private readonly logger: ILogger,
    @inject(types.SessionRepository) private readonly sessionRepository: SessionRepository
  ) {}
  async execute(command: CreateSessionCommand): Promise<Session> {
    this.logger.info('Creating session', { command });

    const session = await this.sessionRepository.create(
      new Session(
        uuidv7(),
        command.dmId,
        command.title,
        command.status as SessionStatus,
        command.notes,
        command.createdAt,
        command.updatedAt
      )
    );
    return session;
  }
}
