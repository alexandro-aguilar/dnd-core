import SubraceDto from '../dtos/SubraceDto';

export default class Subrace {
  constructor(
    private readonly _id: string,
    private readonly _raceId: string,
    private readonly _name: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Subrace id cannot be null or undefined');
    }
    if (!this._raceId) {
      throw new Error('Subrace raceId cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Subrace name cannot be null or undefined');
    }
  }

  toDto(): SubraceDto {
    return {
      id: this._id,
      raceId: this._raceId,
      name: this._name,
    };
  }
}
