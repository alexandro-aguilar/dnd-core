import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import ItemsRepository from '../../domain/repositories/ItemsRepository';
import ItemDto from '../../domain/dtos/ItemDto';

@injectable()
export default class GetItemsController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.ItemsRepository) private readonly itemsRepository: ItemsRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<ItemDto>>> {
    this.logger.info('Getting all items');
    const items = await this.itemsRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(items.map((item) => item.toDto())) };
  }
}
