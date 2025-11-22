import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import UsersRepository from '../../domain/repositories/UsersRepository';
import UserDto from '../../domain/dtos/UserDto';

@injectable()
export default class GetUsersController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.UsersRepository) private readonly usersRepository: UsersRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<UserDto>>> {
    this.logger.info('Getting all users');
    const users = await this.usersRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(users.map((user) => user.toDto())) };
  }
}
