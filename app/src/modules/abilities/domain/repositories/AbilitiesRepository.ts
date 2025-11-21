import Ability from '../entities/Ability';

export default interface AbilitiesRepository {
  listAll(): Promise<Array<Ability>>;
}
