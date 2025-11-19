import Class from '../entities/Class';

export default interface ClassRepository {
  listAll(): Promise<Array<Class>>;
}
