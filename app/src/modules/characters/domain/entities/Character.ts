import Subrace from '@src/modules/subraces/domain/entities/Subrace';
import CharacterDto from '../dtos/CharacterDto';
import Background from '@src/modules/backgrounds/domain/entities/Background';
import Race from '@src/modules/races/domain/entities/Race';

export default class Character {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _name: string,
    private readonly _level: number,
    private readonly _race: string | Race,
    private readonly _subrace: string | null | Subrace,
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
    if (!this._userId) throw new Error('Character userId cannot be null or undefined');
    if (!this._name) throw new Error('Character name cannot be null or undefined');
    if (this._level === undefined || this._level === null) throw new Error('Character level cannot be null');
    if (!this._race) throw new Error('Character race cannot be null or undefined');
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

  toDto(): CharacterDto {
    return {
      id: this._id,
      userId: this._userId,
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
