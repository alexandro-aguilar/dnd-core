import 'reflect-metadata';
import middy from '@middy/core';
import { logMetrics } from '@aws-lambda-powertools/metrics/middleware';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer/middleware';
import { Context, PostConfirmationTriggerEvent, PostConfirmationTriggerHandler } from 'aws-lambda';
import { container } from '../../config/container';
import { types } from '../../config/types';
import ILogger from '@src/core/utils/ILogger';
import MetricsService from '@src/core/utils/MetricsService';
import TracerService from '@src/core/utils/TracerService';
import SyncUserOnSignupController from '../controllers/SyncUserOnSignupController';

const tracer = container.get<TracerService>(types.TracerService).tracer;
const metrics = container.get<MetricsService>(types.MetricsService).metrics;
const logger: ILogger = container.get(types.Logger);

export const handler: PostConfirmationTriggerHandler = middy(
  async (event: PostConfirmationTriggerEvent, context: Context) => {
    logger.addContext({ requestId: context.awsRequestId });

    const controller = container.get<SyncUserOnSignupController>(types.SyncUserOnSignupController);
    await controller.execute(event);

    return event;
  }
)
  .use(
    logMetrics(metrics, {
      captureColdStartMetric: true,
      throwOnEmptyMetrics: false,
    })
  )
  .use(captureLambdaHandler(tracer));
