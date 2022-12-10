import { Bot } from '../../../util/custom-types/telegraf.types';
import { Controller } from '../../../logic/controller';
import { AddScheduleService } from './add-schedule.service';
import * as amqp from 'amqplib';

export class AddScheduleController extends Controller {
  constructor(service: AddScheduleService) {
    super();
    this.service = service;
  }
  private readonly service: AddScheduleService;

  register(bot: Bot, rabbitChannel?: amqp.Channel): string {
    bot.on('document', (ctx) => {
      if (!ctx.message?.document) {
        return;
      }
      const doc = ctx.message.document;
      if (!doc.file_name) {
        return;
      }

      if (doc.mime_type !== 'application/json') {
        return;
      }
      ctx.reply('Sending Request...').then((msg) => {
        ctx.telegram.getFileLink(doc.file_id).then((link) => {
          this.service.addSchedule({
            link: link,
            from: ctx.from,
            botMsg: msg,
          }).then(() => bot.telegram.editMessageText(
            msg.chat.id,
            msg.message_id,
            undefined,
            'Request Sent!',
          ));
        });
      });
    });
    return super.register(bot, rabbitChannel);
  }
}

