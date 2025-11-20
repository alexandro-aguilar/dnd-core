import Background from '../entities/Background';

export default interface BackgroundsRepository {
  listAll(): Promise<Array<Background>>;
}
