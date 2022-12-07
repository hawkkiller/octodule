import * as typegram from 'telegraf/typings/core/types/typegram';

interface AddScheduleServiceArgs {
  readonly document: typegram.Document;
  readonly from: typegram.User;
  readonly botMsg: typegram.Message;
}

export interface AddScheduleService {
  addSchedule(args: AddScheduleServiceArgs): Promise<void>;
}

export class AddScheduleServiceImpl implements AddScheduleService {
  /**
   * @returns Promise<void>
  */
  async addSchedule(args: AddScheduleServiceArgs): Promise<void> {
    const { document, from, botMsg } = args;
    console.log(document);
    console.log(from);
    console.log(botMsg);
  }
}