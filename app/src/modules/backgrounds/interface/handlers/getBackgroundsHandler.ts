import 'reflect-metadata';
import middy from '@middy/core';
import { logMetrics } from '@aws-lambda-powertools/metrics/middleware';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer/middleware';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from 'aws-lambda';
import { container } from '../../config/container';
import { types } from '../../config/types';
import { requestHandler } from '@src/core/middleware/requestHandler';
import { requestValidator } from '@src/core/middleware/requestValidator';
import { responseHandler } from '@src/core/middleware/responseHandler';
import { inputGetBackgroundSchema } from './inputGetBackgroundSchema';
import ILogger from '@src/core/utils/ILogger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import GetBackgroundsController from '../controllers/GetBackgroundsController';
import BackgroundDto from '../../domain/dtos/BackgroundDto';

const tracer = container.get<TracerService>(types.TracerService).tracer;
const metrics = container.get<MetricsService>(types.MetricsService).metrics;
const logger: ILogger = container.get(types.Logger);

export const handler = middy(
  async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2<Array<BackgroundDto>>> => {
    logger.addContext({ requestId: context.awsRequestId });

    const getBackgroundsController = container.get<GetBackgroundsController>(types.GetBackgroundsController);
    const response = await getBackgroundsController.execute();

    return response;
  }
)
  .use(requestValidator(inputGetBackgroundSchema))
  .use(requestHandler(metrics))
  .use(
    logMetrics(metrics, {
      captureColdStartMetric: true,
      throwOnEmptyMetrics: false,
    })
  )
  .use(captureLambdaHandler(tracer))
  .use(responseHandler());
