import Item from '../entities/Item';

export default interface ItemsRepository {
  listAll(): Promise<Array<Item>>;
}
