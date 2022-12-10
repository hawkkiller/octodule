import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { Logger } from 'tslog';
import { Config } from './config/config';
import { App } from './feature/app/logic/app';
import { AddScheduleController } from './feature/schedule/logic/add-schedule.controller';
import { AddScheduleServiceImpl } from './feature/schedule/logic/add-schedule.service';
import { Controller } from './logic/controller';

// start
bootstrap().then(null);

async function bootstrap() {
  const logger = new Logger<never>(
    {
      stylePrettyLogs: true,
    },
  );
  logger.info('Loading Config...');
  await dotenv.config();
  const config = Config.getConfig();

  logger.info('Creating Bot');
  const bot = new Telegraf(config.botToken);

  logger.info('Connecting to RabbitMQ');
  const [rabbitConnection, rabbitChannel] = await configureRabbit(config);

  const addScheduleController = new AddScheduleController(
    new AddScheduleServiceImpl(logger)
  );

  const controllers: Controller[] = [addScheduleController];

  const app = new App({
    controllers,
    bot,
    logger,
    rabbitChannel,
    rabbitConnection,
  });
  // start app
  app.start();
}

async function configureRabbit(config: Config): Promise<[amqp.Connection, amqp.Channel]> {
  const amqpConn = await amqp.connect(config.rabbitMQHost);
  const channel = await amqpConn.createChannel();
  return [amqpConn, channel];
}