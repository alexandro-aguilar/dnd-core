import 'reflect-metadata';
import middy from '@middy/core';
import { logMetrics } from '@aws-lambda-powertools/metrics/middleware';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer/middleware';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from 'aws-lambda';
import { container } from '../../config/container';
import { types } from '../../config/types';
import { requestHandler } from '@src/core/middleware/requestHandler';
import { responseHandler } from '@src/core/middleware/responseHandler';
import ILogger from '@src/core/utils/ILogger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import GetCharactersController from '../controllers/GetCharactersController';
import CharacterDto from '../../domain/dtos/CharacterDto';

const tracer = container.get<TracerService>(types.TracerService).tracer;
const metrics = container.get<MetricsService>(types.MetricsService).metrics;
const logger: ILogger = container.get(types.Logger);

export const handler = middy(
  async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2<Array<CharacterDto>>> => {
    logger.addContext({ requestId: context.awsRequestId });

    const getCharactersController = container.get<GetCharactersController>(types.GetCharactersController);
    const response = await getCharactersController.execute();

    return response;
  }
)
  .use(requestHandler(metrics))
  .use(
    logMetrics(metrics, {
      captureColdStartMetric: true,
      throwOnEmptyMetrics: false,
    })
  )
  .use(captureLambdaHandler(tracer))
  .use(responseHandler());
