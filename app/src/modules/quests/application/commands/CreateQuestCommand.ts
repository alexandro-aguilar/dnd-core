import { QuestStatus } from '../../domain/dtos/QuestDto';

export default class CreateQuestCommand {
  constructor(
    private readonly _sessionId: string,
    private readonly _name: string,
    private readonly _status: QuestStatus,
    private readonly _summary: string | null,
    private readonly _hook: string | null,
    private readonly _reward: string | null,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date
  ) {}

  get sessionId(): string {
    return this._sessionId;
  }

  get name(): string {
    return this._name;
  }

  get status(): QuestStatus {
    return this._status;
  }

  get summary(): string | null {
    return this._summary;
  }

  get hook(): string | null {
    return this._hook;
  }

  get reward(): string | null {
    return this._reward;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
