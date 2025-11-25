import User from '../entities/User';

export default interface UsersRepository {
  listAll(): Promise<Array<User>>;
  create(user: User): Promise<User>;
}
