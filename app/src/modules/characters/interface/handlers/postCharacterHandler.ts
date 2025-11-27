import 'reflect-metadata';
import middy from '@middy/core';
import { logMetrics } from '@aws-lambda-powertools/metrics/middleware';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer/middleware';
import { APIGatewayProxyResultV2, Context } from 'aws-lambda';
import { container } from '../../config/container';
import { types } from '../../config/types';
import { requestHandler } from '@src/core/middleware/requestHandler';
import { requestValidator } from '@src/core/middleware/requestValidator';
import { responseHandler } from '@src/core/middleware/responseHandler';
import ILogger from '@src/core/utils/ILogger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import { inputPostCharacterSchema } from './inputPostCharacterSchema';
import CharacterDto from '../../domain/dtos/CharacterDto';
import PostCharacterController from '../controllers/PostCharacterController';
import ParsedAPIGatewayProxyEventV2 from '@src/core/interface/ParsedAPIGatewayProxyEventV2';

const tracer = container.get<TracerService>(types.TracerService).tracer;
const metrics = container.get<MetricsService>(types.MetricsService).metrics;
const logger: ILogger = container.get(types.Logger);

export const handler = middy(
  async (event: ParsedAPIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2<CharacterDto>> => {
    logger.addContext({ requestId: context.awsRequestId });

    const postCharacterController = container.get<PostCharacterController>(types.PostCharacterController);
    const response = await postCharacterController.execute(event);

    return response;
  }
)
  .use(requestValidator(inputPostCharacterSchema))
  .use(requestHandler(metrics))
  .use(
    logMetrics(metrics, {
      captureColdStartMetric: true,
      throwOnEmptyMetrics: false,
    })
  )
  .use(captureLambdaHandler(tracer))
  .use(responseHandler());
