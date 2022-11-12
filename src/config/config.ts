interface IConfig {
  readonly botToken: string;
}

interface GetConfigParams {
  readonly reload?: boolean;
}

const getConfigDefaults: GetConfigParams = {
  reload: false,
};

class Config {
  constructor({ botToken }: IConfig) {
    this.botToken = botToken;
  }

  readonly botToken: string;

  static config: Config | undefined;

  /**
   * Returns the config object.
   *
   * @returns The config object
   * @param args
   */
  public static getConfig(args?: GetConfigParams): Config {
    args = { ...getConfigDefaults, ...args };

    if (Config.config && (!args?.reload ?? false)) {
      return Config.config;
    }
    const botToken = this.fromEnv('BOT_TOKEN');

    // Resulting config object
    const config = new Config({
      botToken: botToken,
    });
    Config.config = config;
    return config;
  }

  private static fromEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`${key} is not set`);
    }
    return value;
  }

}

export { Config };