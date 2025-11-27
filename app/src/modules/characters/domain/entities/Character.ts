import Subrace from '@src/modules/subraces/domain/entities/Subrace';
import CharacterDto from '../dtos/CharacterDto';
import Background from '@src/modules/backgrounds/domain/entities/Background';
import Race from '@src/modules/races/domain/entities/Race';
import User from '@src/modules/users/domain/entities/User';

export default class Character {
  constructor(
    private readonly _id: string,
    private readonly _user: string | User,
    private readonly _name: string,
    private readonly _level: number,
    private readonly _race: string | Race,
    private readonly _subrace: string | Subrace,
    private readonly _background: string | Background,
    private readonly _alignment: string,
    private readonly _experiencePoints: number,
    private readonly _maxHitPoints: number,
    private readonly _currentHitPoints: number,
    private readonly _temporaryHitPoints: number,
    private readonly _armorClass: number,
    private readonly _speed: number,
    private readonly _inspiration: boolean,
    private readonly _personalityTraits: string | null,
    private readonly _ideals: string | null,
    private readonly _bonds: string | null,
    private readonly _flaws: string | null
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) throw new Error('Character id cannot be null or undefined');
    if (!this._user) throw new Error('Character userId cannot be null or undefined');
    if (!this._name) throw new Error('Character name cannot be null or undefined');
    if (this._level === undefined || this._level === null) throw new Error('Character level cannot be null');
    if (!this._race) throw new Error('Character race cannot be null or undefined');
    if (!this._subrace) throw new Error('Character subrace cannot be null or undefined');
    if (!this._background) throw new Error('Character background cannot be null or undefined');
    if (!this._alignment) throw new Error('Character alignment cannot be null or undefined');
    if (this._experiencePoints === undefined || this._experiencePoints === null)
      throw new Error('Character experiencePoints cannot be null');
    if (this._maxHitPoints === undefined || this._maxHitPoints === null)
      throw new Error('Character maxHitPoints cannot be null');
    if (this._currentHitPoints === undefined || this._currentHitPoints === null)
      throw new Error('Character currentHitPoints cannot be null');
    if (this._temporaryHitPoints === undefined || this._temporaryHitPoints === null)
      throw new Error('Character temporaryHitPoints cannot be null');
    if (this._armorClass === undefined || this._armorClass === null)
      throw new Error('Character armorClass cannot be null');
    if (this._speed === undefined || this._speed === null) throw new Error('Character speed cannot be null');
    if (this._inspiration === undefined || this._inspiration === null)
      throw new Error('Character inspiration cannot be null');
  }

  get id(): string {
    return this._id;
  }

  get user(): string | User {
    return this._user;
  }

  get name(): string {
    return this._name;
  }

  get level(): number {
    return this._level;
  }

  get race(): string | Race {
    return this._race;
  }

  get subrace(): string | Subrace {
    return this._subrace;
  }

  get background(): string | Background {
    return this._background;
  }

  get alignment(): string {
    return this._alignment;
  }

  get experiencePoints(): number {
    return this._experiencePoints;
  }

  get maxHitPoints(): number {
    return this._maxHitPoints;
  }

  get currentHitPoints(): number {
    return this._currentHitPoints;
  }

  get temporaryHitPoints(): number {
    return this._temporaryHitPoints;
  }

  get armorClass(): number {
    return this._armorClass;
  }

  get speed(): number {
    return this._speed;
  }

  get inspiration(): boolean {
    return this._inspiration;
  }

  get personalityTraits(): string | null {
    return this._personalityTraits;
  }

  get ideals(): string | null {
    return this._ideals;
  }

  get bonds(): string | null {
    return this._bonds;
  }

  get flaws(): string | null {
    return this._flaws;
  }

  toDto(): CharacterDto {
    return {
      id: this._id,
      user: this._user,
      name: this._name,
      level: this._level,
      race: this._race,
      subrace: this._subrace,
      background: this._background,
      alignment: this._alignment,
      experiencePoints: this._experiencePoints,
      maxHitPoints: this._maxHitPoints,
      currentHitPoints: this._currentHitPoints,
      temporaryHitPoints: this._temporaryHitPoints,
      armorClass: this._armorClass,
      speed: this._speed,
      inspiration: this._inspiration,
      personalityTraits: this._personalityTraits,
      ideals: this._ideals,
      bonds: this._bonds,
      flaws: this._flaws,
    };
  }
}
