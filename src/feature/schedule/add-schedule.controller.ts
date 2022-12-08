import { Bot } from '../../util/custom-types/telegraf.types';
import { Controller } from '../../logic/controller';
import { AddScheduleService } from './add-schedule.service';

export class AddScheduleController implements Controller {
  constructor(service: AddScheduleService) {
    this.service = service;
  }
  private readonly service: AddScheduleService;

  register(bot: Bot): void {
    bot.on('document', (ctx) => {
      if (ctx.message?.document == null) {
        return;
      }
      const doc = ctx.message.document;
      if (doc.file_name == null) {
        return;
      }

      if (doc.mime_type == null || doc.mime_type !== 'application/json') {
        return;
      }
      ctx.reply('Sending Request...').then((msg) => {
        this.service.addSchedule({
          document: doc,
          from: ctx.from,
          botMsg: msg,
        }).then(() => ctx.editMessageText('Waiting For Response...'));
      });
    });
  }
}

