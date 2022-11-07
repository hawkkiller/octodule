interface IConfig {
  readonly botToken: string;
}

export class Config {
  constructor({ botToken }: IConfig) {
    this.botToken = botToken;
  }

  readonly botToken: string;

  public static getConfig(): Config {
    if (Config.config) {
      return Config.config;
    }
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      throw new Error('BOT_TOKEN is not set');
    }
    const config = new Config({ botToken: botToken });
    Config.config = config;
    return config;
  }

  static config: Config | undefined;
}