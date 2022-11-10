import { Config } from './core/config/config';
import { Telegraf } from 'telegraf';
import { Bot } from './core/util/types/telegraf.types';

bootstrap();

async function bootstrap() {
  const config = Config.getConfig();

  const bot = new Telegraf(config.botToken);

  launchBot({
    bot: bot,
  });
}

function launchBot(args: {
  bot: Bot,
}) {
  const { bot } = args;

  bot.launch();
}
