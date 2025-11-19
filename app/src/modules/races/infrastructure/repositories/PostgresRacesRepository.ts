import Race from '../../domain/entities/Race';
import RacesRepository from '../../domain/repositories/RacesRepository';

export default class PostgresRacesRepository implements RacesRepository {
  listAll(): Promise<Array<Race>> {
    throw new Error('Method not implemented.');
  }
}
