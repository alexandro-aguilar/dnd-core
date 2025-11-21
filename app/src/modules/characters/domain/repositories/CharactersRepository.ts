import Character from '../entities/Character';

export default interface CharactersRepository {
  listAll(): Promise<Array<Character>>;
}
