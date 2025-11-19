import Class from '../entities/Class';

export default interface ClassesRepository {
  listAll(): Promise<Array<Class>>;
}
