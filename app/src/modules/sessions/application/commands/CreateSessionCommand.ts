import { SessionStatus } from '../../domain/dtos/SessionDto';

export default class CreateSessionCommand {
  constructor(
    private _dmId: string,
    private _title: string,
    private _status: SessionStatus, // planned|in_progress|complete
    private _notes: string,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  get dmId(): string {
    return this._dmId;
  }

  get title(): string {
    return this._title;
  }

  get status(): SessionStatus {
    return this._status;
  }

  get notes(): string {
    return this._notes;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
