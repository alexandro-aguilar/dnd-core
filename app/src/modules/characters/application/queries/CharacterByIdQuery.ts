export default class CharacterByIdQuery {
  constructor(private readonly _id: string) {}

  get id(): string {
    return this._id;
  }
}
