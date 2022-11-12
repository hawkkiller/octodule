import { Bot } from '../../util/custom-types/telegraf.types';

export interface Controller {
  register(bot: Bot): void;
}
