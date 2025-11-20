import Subclass from '../entities/Subclass';

export default interface SubclassesRepository {
  listAll(): Promise<Array<Subclass>>;
}
