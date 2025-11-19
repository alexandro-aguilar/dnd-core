import RaceDto from '../dtos/RaceDto';

export default class Race {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _baseSpeed: number,
    private readonly _size: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Race id cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Race name cannot be null or undefined');
    }
    if (!this._baseSpeed) {
      throw new Error('Race baseSpeed cannot be null or undefined');
    }
    if (!this._size) {
      throw new Error('Race size cannot be null or undefined');
    }
  }

  toDto(): RaceDto {
    return {
      id: this._id,
      name: this._name,
      baseSpeed: this._baseSpeed,
      size: this._size,
    };
  }
}
