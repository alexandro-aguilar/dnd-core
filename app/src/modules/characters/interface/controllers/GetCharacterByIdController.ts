import ILogger from '@src/core/utils/ILogger';
import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import GetCharacterByIdQueryHandler from '../../application/handlers/GetCharacterByIdQueryHandler';
import CharacterByIdQuery from '../../application/queries/CharacterByIdQuery';
import CharacterDto from '../../domain/dtos/CharacterDto';

@injectable()
export default class GetCharacterByIdController {
  constructor(
    @inject(types.Logger) private readonly logger: ILogger,
    @inject(types.GetCharacterByIdQueryHandler) private readonly handler: GetCharacterByIdQueryHandler
  ) {}
  async execute(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2<CharacterDto>> {
    this.logger.info('Getting character by ID', event.pathParameters);
    const characterId = event.pathParameters?.characterId as string;
    const result = await this.handler.execute(new CharacterByIdQuery(characterId));
    return {
      statusCode: 200,
      body: JSON.stringify(result.toDto()),
    };
  }
}
