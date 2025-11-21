import Character from '../entities/Character';

export default interface CharactersRepository {
  listAll(): Promise<Array<Character>>;
  getById(id: string): Promise<Character | null>;
}
