import { Bot } from '../util/custom-types/telegraf.types';
import * as amqp from 'amqplib';

export abstract class Controller {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(bot: Bot, channel?: amqp.Channel): string {
    return `${this.constructor.name} registered`;
  }

  destroy(): string {
    return `${this.constructor.name} destroyed`;
  }
}
