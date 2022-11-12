import { Bot } from '../custom-types/telegraf.types';

export interface Controller {
  register(bot: Bot): void;
}
