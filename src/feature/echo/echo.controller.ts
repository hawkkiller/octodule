import { Controller } from '../../logic/controller';
import { Bot } from '../../util/custom-types/telegraf.types';

export class EchoController implements Controller {
  register(bot: Bot): void {
    bot.on('text', (ctx) => {
      const text = ctx.message?.text;
      if (text && text.toLowerCase() == 'beep') {
        ctx.sendMessage('Boop');
      }
    });
  }
}