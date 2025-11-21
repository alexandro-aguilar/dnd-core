import { inject, injectable } from 'inversify';
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { types } from '../../config/types';
import Logger from '@src/core/utils/Logger';
import SkillsRepository from '../../domain/repositories/SkillsRepository';
import SkillDto from '../../domain/dtos/SkillDto';

@injectable()
export default class GetSkillsController {
  constructor(
    @inject(types.Logger) private readonly logger: Logger,
    @inject(types.SkillsRepository) private readonly skillsRepository: SkillsRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<SkillDto>>> {
    this.logger.info('Getting all skills');
    const skills = await this.skillsRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(skills.map((skill) => skill.toDto())) };
  }
}
