import SpellDto from '../dtos/SpellDto';

export default class Spell {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _level: number,
    private readonly _school: string,
    private readonly _castingTime: string,
    private readonly _range: string,
    private readonly _components: string,
    private readonly _duration: string,
    private readonly _concentration: boolean,
    private readonly _description: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Spell id cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Spell name cannot be null or undefined');
    }
    if (this._level === undefined || this._level === null) {
      throw new Error('Spell level cannot be null or undefined');
    }
    if (!this._school) {
      throw new Error('Spell school cannot be null or undefined');
    }
    if (!this._castingTime) {
      throw new Error('Spell castingTime cannot be null or undefined');
    }
    if (!this._range) {
      throw new Error('Spell range cannot be null or undefined');
    }
    if (!this._components) {
      throw new Error('Spell components cannot be null or undefined');
    }
    if (!this._duration) {
      throw new Error('Spell duration cannot be null or undefined');
    }
    if (this._concentration === undefined || this._concentration === null) {
      throw new Error('Spell concentration cannot be null or undefined');
    }
    if (!this._description) {
      throw new Error('Spell description cannot be null or undefined');
    }
  }

  toDto(): SpellDto {
    return {
      id: this._id,
      name: this._name,
      level: this._level,
      school: this._school,
      castingTime: this._castingTime,
      range: this._range,
      components: this._components,
      duration: this._duration,
      concentration: this._concentration,
      description: this._description,
    };
  }
}
