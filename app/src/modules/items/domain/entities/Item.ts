import ItemDto from '../dtos/ItemDto';

export default class Item {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _type: string,
    private readonly _weight?: number | null,
    private readonly _cost?: number | null
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Item id cannot be null or undefined');
    }
    if (!this._name) {
      throw new Error('Item name cannot be null or undefined');
    }
    if (!this._type) {
      throw new Error('Item type cannot be null or undefined');
    }
  }

  toDto(): ItemDto {
    return {
      id: this._id,
      name: this._name,
      type: this._type,
      weight: this._weight ?? null,
      cost: this._cost ?? null,
    };
  }
}
