import 'reflect-metadata';
import middy from '@middy/core';
import { types } from '../../config/types';
import { container } from '../../config/container';
import ILogger from '../../../../core/utils/ILogger';
import MetricsService from '@src/core/utils/MetricsService';
import { inputGetClassSchema } from './inputGetClassSchema';
import TracerService from '../../../../core/utils/TracerService';
import { requestHandler } from '@src/core/middleware/requestHandler';
import { logMetrics } from '@aws-lambda-powertools/metrics/middleware';
import { responseHandler } from '@src/core/middleware/responseHandler';
import { requestValidator } from '@src/core/middleware/requestValidator';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer/middleware';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from 'aws-lambda';
import GetClassController from '../controllers/GetClassController';
import ClassDto from '../../domain/dtos/ClassDto';

const tracer = container.get<TracerService>(types.TracerService).tracer;
const metrics = container.get<MetricsService>(types.MetricsService).metrics;
const logger: ILogger = container.get(types.Logger);

export const handler = middy(
  async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2<Array<ClassDto>>> => {
    logger.addContext({ requestId: context.awsRequestId });
    logger.info('env:', { env: process.env });

    const getClassController = container.get<GetClassController>(types.GetClassController);
    const response = await getClassController.execute(event);

    return response;
  }
)
  .use(requestValidator(inputGetClassSchema))
  .use(requestHandler(metrics))
  .use(
    logMetrics(metrics, {
      captureColdStartMetric: true,
      throwOnEmptyMetrics: false,
    })
  )
  .use(captureLambdaHandler(tracer))
  .use(responseHandler());
