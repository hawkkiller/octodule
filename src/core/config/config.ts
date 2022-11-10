interface IConfig {
  readonly botToken: string;
  readonly db: DB;
}

interface GetConfigParams {
  readonly reload?: boolean;
}

interface DBParams {
  readonly uri: string;
}

const getConfigDefaults: GetConfigParams = {
  reload: false,
};

class Config {
  constructor({ botToken, db }: IConfig) {
    this.botToken = botToken;
    this.db = db;
  }

  readonly botToken: string;
  readonly db: DB;

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
    const dbDSN = this.fromEnv('DB_DSN');

    const db = new DB({
      uri: dbDSN,
    });
    // Resulting config object
    const config = new Config({
      botToken: botToken,
      db: db,
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

class DB {
  constructor(args: DBParams) {
    this.dsn = args.uri;
  }

  readonly dsn: string;
}

export { Config };