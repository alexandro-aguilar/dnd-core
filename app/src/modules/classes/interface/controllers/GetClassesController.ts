import { APIGatewayProxyResultV2 } from 'aws-lambda';
import ClassDto from '../../domain/dtos/ClassDto';
import { inject, injectable } from 'inversify';
import { types } from '../../config/types';
import ClassRepository from '../../domain/repositories/ClassesRepository';
import ILogger from '@src/core/utils/ILogger';

@injectable()
export default class GetClassesController {
  constructor(
    @inject(types.Logger) private logger: ILogger,
    @inject(types.ClassesRepository) private classRepository: ClassRepository
  ) {}

  async execute(): Promise<APIGatewayProxyResultV2<Array<ClassDto>>> {
    this.logger.info('Executing GetClassesController');
    const classes = await this.classRepository.listAll();
    return { statusCode: 200, body: JSON.stringify(classes.map((cls) => cls.toDto())) };
  }
}
