import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import BackgroundsRepository from '../../domain/repositories/BackgroundsRepository';
import BackgroundDto from '../../domain/dtos/BackgroundDto';

@injectable()
export default class GetBackgroundsController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.BackgroundsRepository) private readonly backgroundsRepository: BackgroundsRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<BackgroundDto>>> {
    this.logger.info('Getting all backgrounds');
    const backgrounds = await this.backgroundsRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(backgrounds.map((background) => background.toDto())) };
  }
}
