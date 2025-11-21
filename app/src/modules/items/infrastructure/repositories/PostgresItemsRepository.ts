import { inject, injectable } from 'inversify';
import { db } from '@src/core/infrastructure/database/postgres-drizzle.config';
import { items as itemsTable } from '@src/core/infrastructure/database/schema';
import ILogger from '@src/core/utils/ILogger';
import { types } from '../../config/types';
import ItemsRepository from '../../domain/repositories/ItemsRepository';
import Item from '../../domain/entities/Item';

@injectable()
export default class PostgresItemsRepository implements ItemsRepository {
  constructor(@inject(types.Logger) private readonly logger: ILogger) {}
  async listAll(): Promise<Array<Item>> {
    try {
      this.logger.info('Fetching all items from PostgresItemsRepository');
      const results = await db.select().from(itemsTable).execute();
      if (!results) return [];

      return results.map((result) => new Item(result.id, result.name, result.type, result.weight, result.cost));
    } catch (error) {
      this.logger.error('Error fetching items from database', { error });
      throw error;
    }
  }
}
