import dotenv from "dotenv";
import type { Config } from "./types/config.types";
dotenv.config();

const config: Config = {
  env: process.env.NODE_ENV!,
  databaseConfig: {
    name: process.env.DATABASE_NAME!,
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    dialect: process.env.DATABASE_DIALECT!,
    host: process.env.DATABASE_HOST!,
  },
  appConfig: {
    port: process.env.API_APPLICATION_PORT,
  },
  infuraApiKey: process.env.INFURA_API_KEY,
};

export default config;