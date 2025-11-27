export default class CreateCharacterCommand {
  constructor(
    private readonly _userId: string,
    private readonly _name: string,
    private readonly _level: number,
    private readonly _raceId: string,
    private readonly _subraceId: string,
    private readonly _backgroundId: string,
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
  ) {}

  get userId(): string {
    return this._userId;
  }

  get name(): string {
    return this._name;
  }

  get level(): number {
    return this._level;
  }

  get raceId(): string {
    return this._raceId;
  }

  get subraceId(): string {
    return this._subraceId;
  }

  get backgroundId(): string {
    return this._backgroundId;
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
}
