import Spell from '../entities/Spell';

export default interface SpellsRepository {
  listAll(): Promise<Array<Spell>>;
}
