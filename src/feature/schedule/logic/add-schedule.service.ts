import { Schedule } from './../model/model';
import { Logger } from 'tslog';
import axios from 'axios';
import { debug } from 'console';
import * as typegram from 'telegraf/typings/core/types/typegram';
import { textChangeRangeIsUnchanged } from 'typescript';

interface AddScheduleServiceArgs {
  readonly link: URL;
  readonly from: typegram.User;
  readonly botMsg: typegram.Message;
}

export interface AddScheduleService {
  addSchedule(args: AddScheduleServiceArgs): Promise<void>;
}

export class AddScheduleServiceImpl implements AddScheduleService {
  constructor(private readonly logger: Logger<never>) { }
  /**
   * @returns Promise<void>
  */
  async addSchedule(args: AddScheduleServiceArgs): Promise<void> {
    const { link, from, botMsg } = args;
    const json = await axios.get(link.toString());
    
  }
}