import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import ILogger from '@src/core/utils/ILogger';
import ParsedAPIGatewayProxyEventV2 from '@src/core/interface/ParsedAPIGatewayProxyEventV2';
import QuestDto from '../../domain/dtos/QuestDto';
import CreateQuestCommandHandler from '../../application/handlers/CreateQuestCommandHandler';
import CreateQuestCommand from '../../application/commands/CreateQuestCommand';
import { decodeBearerToken } from '@src/core/utils/JwtDecoder';

@injectable()
export default class PostQuestController {
  constructor(
    @inject(types.Logger) private readonly logger: ILogger,
    @inject(types.CreateQuestCommandHandler)
    private readonly createQuestCommandHandler: CreateQuestCommandHandler
  ) {}

  async execute(event: ParsedAPIGatewayProxyEventV2<CreateQuestCommand>): Promise<APIGatewayProxyResultV2<QuestDto>> {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const claims = decodeBearerToken(authHeader);
    if (!claims?.sub) {
      throw new Error('Authentication failed: invalid or missing user identifier');
    }

    const now = new Date();
    const command = new CreateQuestCommand(
      event.body.sessionId,
      event.body.name,
      event.body.status,
      event.body.summary ?? null,
      event.body.hook ?? null,
      event.body.reward ?? null,
      now,
      now
    );

    const quest = await this.createQuestCommandHandler.execute(command);
    return { statusCode: 201, body: JSON.stringify(quest.toDto()) };
  }
}
