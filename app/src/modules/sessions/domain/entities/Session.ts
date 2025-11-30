import User from '@src/modules/users/domain/entities/User';
import SessionDto, { SessionStatus } from '../dtos/SessionDto';

export default class Session {
  constructor(
    private readonly _id: string,
    private readonly _dm: string | User,
    private readonly _title: string,
    private readonly _status: SessionStatus,
    private readonly _notes?: string | null,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) throw new Error('Session id cannot be null or undefined');
    if (!this._dm) throw new Error('Session dm cannot be null or undefined');
    if (!this._title) throw new Error('Session title cannot be null or undefined');
    if (!this._status) throw new Error('Session status cannot be null or undefined');
  }

  toDto(): SessionDto {
    return {
      id: this._id,
      dm: this._dm,
      title: this._title,
      status: this._status,
      notes: this._notes,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  get id(): string {
    return this._id;
  }

  get dm(): string | User {
    return this._dm;
  }

  get title(): string {
    return this._title;
  }

  get status(): SessionStatus {
    return this._status;
  }

  get notes(): string | null | undefined {
    return this._notes;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
