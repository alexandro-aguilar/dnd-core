import UserDto from '../dtos/UserDto';

export default class User {
  constructor(
    private readonly _id: string,
    private readonly _email: string,
    private readonly _name: string,
    private readonly _passwordHash: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('User id cannot be null or undefined');
    }
    if (!this._email) {
      throw new Error('User email cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('User name cannot be null or undefined');
    }
    if (!this._passwordHash) {
      throw new Error('User passwordHash cannot be null or undefined');
    }
  }

  toDto(): UserDto {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
    };
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }
}
