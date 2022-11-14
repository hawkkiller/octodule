import { Controller } from '../../feature/echo/logic/controller';
import { Bot } from '../../util/custom-types/telegraf.types';

export class EchoController implements Controller {
  register(bot: Bot): void {
    bot.command('echo', (ctx) => {
      const { message } = ctx;
      const { text } = message;
      const echo = text?.split(' ').slice(1).join(' ');
      ctx.reply(echo);
    });
  }
}