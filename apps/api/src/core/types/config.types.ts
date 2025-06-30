
export interface DatabaseConfig {
  name: string;
  username: string;
  password: string;
  dialect: string;
  host: string;
}

export interface AppConfig {
  port: string | undefined;
}

export interface Config {
  env: string;
  databaseConfig: DatabaseConfig;
  appConfig: AppConfig;
  infuraApiKey: string;
}
