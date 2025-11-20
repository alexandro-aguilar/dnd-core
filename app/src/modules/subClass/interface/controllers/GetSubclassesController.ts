import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import SubclassesRepository from '../../domain/repositories/SubclassesRepository';
import SubclassDto from '../../domain/dtos/SubclassDto';

@injectable()
export default class GetSubclassesController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.SubclassesRepository) private readonly subclassesRepository: SubclassesRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<SubclassDto>>> {
    this.logger.info('Getting all subclasses');
    const subclasses = await this.subclassesRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(subclasses.map((subclass) => subclass.toDto())) };
  }
}
