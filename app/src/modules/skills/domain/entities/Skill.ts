import SkillDto from '../dtos/SkillDto';

export default class Skill {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _abilityId: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Skill id cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Skill name cannot be null or undefined');
    }
    if (!this._abilityId) {
      throw new Error('Skill abilityId cannot be null or undefined');
    }
  }

  toDto(): SkillDto {
    return {
      id: this._id,
      name: this._name,
      abilityId: this._abilityId,
    };
  }
}
