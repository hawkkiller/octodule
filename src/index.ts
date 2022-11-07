import { Config } from './core/config/config';
import { Telegraf } from 'telegraf';

const config = Config.getConfig();

const bot = new Telegraf(config.botToken);

console.log('Bot is running');
bot.launch();