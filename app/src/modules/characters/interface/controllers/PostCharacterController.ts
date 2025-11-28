import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import CreateCharacterCommandHandler from '../../application/handlers/CreateCharacterCommandHandler';
import ILogger from '@src/core/utils/ILogger';
import CreateCharacterCommand from '../../application/commands/CreateCharacterCommand';
import ParsedAPIGatewayProxyEventV2 from '@src/core/interface/ParsedAPIGatewayProxyEventV2';
import { decodeBearerToken } from '@src/core/utils/JwtDecoder';

@injectable()
export default class PostCharacterController {
  constructor(
    @inject(types.Logger) private logger: ILogger,
    @inject(types.CreateCharacterCommandHandler) private commandHandler: CreateCharacterCommandHandler
  ) {}

  async execute(
    event: ParsedAPIGatewayProxyEventV2<Omit<CreateCharacterCommand, 'userId'>>
  ): Promise<APIGatewayProxyResultV2> {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const claims = decodeBearerToken(authHeader);
    this.logger.info('Decoded JWT claims', { claims });
    const userId = claims.sub;
    if (!userId) {
      throw new Error('Missing subject in JWT');
    }
    this.logger.info('Creating new character for user', { userId });
    const command = new CreateCharacterCommand(
      userId,
      event.body.name,
      event.body.level,
      event.body.raceId,
      event.body.subraceId,
      event.body.backgroundId,
      event.body.alignment,
      event.body.experiencePoints,
      event.body.maxHitPoints,
      event.body.currentHitPoints,
      event.body.temporaryHitPoints,
      event.body.armorClass,
      event.body.speed,
      event.body.inspiration,
      event.body.personalityTraits,
      event.body.ideals,
      event.body.bonds,
      event.body.flaws
    );
    const result = await this.commandHandler.execute(command);

    return { statusCode: 201, body: JSON.stringify(result.toDto()) };
  }
}
