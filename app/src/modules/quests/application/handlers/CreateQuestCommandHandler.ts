import { inject, injectable } from 'inversify';
import { v7 as uuidv7 } from 'uuid';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import QuestRepository from '../../domain/repositories/QuestRepository';
import Quest from '../../domain/entities/Quest';
import { QuestStatus } from '../../domain/dtos/QuestDto';
import CreateQuestCommand from '../commands/CreateQuestCommand';

@injectable()
export default class CreateQuestCommandHandler {
  constructor(
    @inject(types.Logger) private readonly logger: ILogger,
    @inject(types.QuestRepository) private readonly questRepository: QuestRepository
  ) {}

  async execute(command: CreateQuestCommand): Promise<Quest> {
    this.logger.info('Creating quest', { command });
    const quest = new Quest(
      uuidv7(),
      command.sessionId,
      command.name,
      command.status as QuestStatus,
      command.summary,
      command.hook,
      command.reward,
      command.createdAt,
      command.updatedAt
    );
    const created = await this.questRepository.create(quest);
    return created;
  }
}
