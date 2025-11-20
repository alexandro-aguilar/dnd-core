import BackgroundDto from '../dtos/BackgroundDto';

export default class Background {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _feature: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Background id cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Background name cannot be null or undefined');
    }
    if (!this._feature) {
      throw new Error('Background feature cannot be null or undefined');
    }
  }

  toDto(): BackgroundDto {
    return {
      id: this._id,
      name: this._name,
      feature: this._feature,
    };
  }
}
