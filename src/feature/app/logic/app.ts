import * as amqp from 'amqplib';
import { Logger } from 'tslog';
import { Controller } from '../../../logic/controller';
import { Bot } from '../../../util/custom-types/telegraf.types';

export class App {
  constructor(
    private readonly args: {
      controllers: Controller[],
      rabbitChannel: amqp.Channel,
      rabbitConnection: amqp.Connection,
      logger: Logger<never>,
      bot: Bot,
    },
  ) {
    this.rabbitChannel = args.rabbitChannel;
    this.rabbitConnection = args.rabbitConnection;
    this.logger = args.logger;
    this.controllers = args.controllers;
    this.bot = args.bot;
  }

  private readonly rabbitChannel: amqp.Channel;
  private readonly rabbitConnection: amqp.Connection;
  private readonly logger: Logger<never>;
  private readonly controllers: Controller[];
  private readonly bot: Bot;

  public start(): void {
    this.logger.info('Configuring application...');
    this.controllers.forEach((controller) => {
      this.logger.info(controller.register(this.bot, this.rabbitChannel));
    });
    this.logger.info('Application configured');
    this.bot.launch();
    this.logger.info('Bot Started');
    process.on('SIGTERM', () => {
      this.gracefulShutdown('SIGTERM');
    });
    process.on('SIGINT', () => {
      this.gracefulShutdown('SIGINT');
    });
    process.on('SIGQUIT', () => {
      this.gracefulShutdown('SIGQUIT');
    });
  }

  private gracefulShutdown(stopSignal: 'SIGTERM' | 'SIGINT' | 'SIGQUIT'): void {
    this.logger.info(`${stopSignal} received: gracefully shutting down`);
    // close all controllers
    Promise.all(this.controllers.map((controller) => controller.destroy())).then((msg) => {
      msg.forEach((message) => {
        this.logger.info(message);
      });
      Promise.all([
        this.rabbitConnection.close(),
      ]).then(() => {
        this.logger.info('Graceful shutdown completed');
        process.exit(0);
      });
    });
  }
}