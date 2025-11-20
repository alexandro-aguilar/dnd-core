import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import SubracesRepository from '../../domain/repositories/SubracesRepository';
import SubraceDto from '../../domain/dtos/SubraceDto';

@injectable()
export default class GetSubracesController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.SubracesRepository) private readonly subracesRepository: SubracesRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<SubraceDto>>> {
    this.logger.info('Getting all subraces');
    const subraces = await this.subracesRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(subraces.map((subrace) => subrace.toDto())) };
  }
}
