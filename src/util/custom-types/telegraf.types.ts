import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { Telegraf } from 'telegraf/typings/telegraf';

type Bot = Telegraf<Context<Update>>;

export { Bot };