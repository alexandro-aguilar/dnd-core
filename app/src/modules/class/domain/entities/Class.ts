import BaseEntity from '@src/core/domain/entities/BaseEntity';
import ClassDto from '../dtos/ClassDto';

export default class Class extends BaseEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _hitDie: string,
    private readonly _primaryAbility: string,
    private readonly _spellcastingAbility?: string | null
  ) {
    super();
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Class id cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Class name cannot be null or undefined');
    }
    if (!this._hitDie) {
      throw new Error('Class hitDie cannot be null or undefined');
    }
    if (!this._primaryAbility) {
      throw new Error('Class primaryAbility cannot be null or undefined');
    }
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get hitDie(): string {
    return this._hitDie;
  }
  get primaryAbility(): string {
    return this._primaryAbility;
  }
  get spellcastingAbility(): string | undefined | null {
    return this._spellcastingAbility;
  }

  toDto(): ClassDto {
    return {
      id: this._id,
      name: this._name,
      hitDie: this._hitDie,
      primaryAbility: this._primaryAbility,
      spellcastingAbility: this._spellcastingAbility,
    };
  }
}
