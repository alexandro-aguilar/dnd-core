import AbilityDto from '../dtos/AbilityDto';

export default class Ability {
  constructor(
    private readonly _id: string,
    private readonly _code: string,
    private readonly _name: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Ability id cannot be null or undefined');
    }
    if (!this._code) {
      throw new Error('Ability code cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Ability name cannot be null or undefined');
    }
  }

  toDto(): AbilityDto {
    return {
      id: this._id,
      code: this._code,
      name: this._name,
    };
  }
}
