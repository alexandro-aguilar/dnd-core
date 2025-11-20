import Subrace from '../entities/Subrace';

export default interface SubracesRepository {
  listAll(): Promise<Array<Subrace>>;
}
