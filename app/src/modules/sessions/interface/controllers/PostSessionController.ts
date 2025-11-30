import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import ILogger from '@src/core/utils/ILogger';
import SessionDto from '../../domain/dtos/SessionDto';
import { decodeBearerToken } from '@src/core/utils/JwtDecoder';
import CreateSessionCommand from '../../application/commands/CreateSessionCommand';
import ParsedAPIGatewayProxyEventV2 from '@src/core/interface/ParsedAPIGatewayProxyEventV2';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import CreateSessionCommandHandler from '../../application/handlers/CreateSessionCommandHandler';

@injectable()
export default class PostSessionController {
  constructor(
    @inject(types.Logger) private readonly logger: ILogger,
    @inject(types.CreateSessionCommandHandler) private readonly createSessionCommandHandler: CreateSessionCommandHandler
  ) {}

  async execute(
    event: ParsedAPIGatewayProxyEventV2<CreateSessionCommand>
  ): Promise<APIGatewayProxyResultV2<SessionDto>> {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const claims = decodeBearerToken(authHeader);
    this.logger.info('Decoded JWT claims', { claims });
    const userId = claims.sub;
    if (!userId) {
      throw new Error('Authentication failed: invalid or missing user identifier');
    }
    this.logger.info('Creating new session for user', { userId });
    const command = new CreateSessionCommand(
      userId,
      event.body.title,
      event.body.status,
      event.body.notes,
      new Date(),
      new Date()
    );
    const result = await this.createSessionCommandHandler.execute(command);

    return { statusCode: 201, body: JSON.stringify(result.toDto()) };
  }
}
