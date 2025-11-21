import SubclassDto from '../dtos/SubclassDto';

export default class Subclass {
  constructor(
    private readonly _id: string,
    private readonly _classId: string,
    private readonly _name: string,
    private readonly _description: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Subclass id cannot be null or undefined');
    }
    if (!this._classId) {
      throw new Error('Subclass classId cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Subclass name cannot be null or undefined');
    }
    if (!this._description) {
      throw new Error('Subclass description cannot be null or undefined');
    }
  }

  toDto(): SubclassDto {
    return {
      id: this._id,
      classId: this._classId,
      name: this._name,
      description: this._description,
    };
  }
}
