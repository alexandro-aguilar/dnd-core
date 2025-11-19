import Race from '../entities/Race';

export default interface RacesRepository {
  listAll(): Promise<Array<Race>>;
}
