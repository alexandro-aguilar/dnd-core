import QuestDto, { QuestStatus } from '../dtos/QuestDto';

export default class Quest {
  constructor(
    private readonly _id: string,
    private readonly _sessionId: string,
    private readonly _name: string,
    private readonly _status: QuestStatus,
    private readonly _summary?: string | null,
    private readonly _hook?: string | null,
    private readonly _reward?: string | null,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) throw new Error('Quest id cannot be null or undefined');
    if (!this._sessionId) throw new Error('Quest sessionId cannot be null or undefined');
    if (!this._name) throw new Error('Quest name cannot be null or undefined');
    if (!this._status) throw new Error('Quest status cannot be null or undefined');
  }

  toDto(): QuestDto {
    return {
      id: this._id,
      sessionId: this._sessionId,
      name: this._name,
      summary: this._summary,
      status: this._status,
      hook: this._hook,
      reward: this._reward,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  get id(): string {
    return this._id;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  get name(): string {
    return this._name;
  }

  get status(): QuestStatus {
    return this._status;
  }

  get summary(): string | null | undefined {
    return this._summary;
  }

  get hook(): string | null | undefined {
    return this._hook;
  }

  get reward(): string | null | undefined {
    return this._reward;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
