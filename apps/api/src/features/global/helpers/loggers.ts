import winston from "winston";
import config from "../../../core/config";
const { createLogger, format, transports } = winston;
const { env } = config;

const logger = createLogger({});

if (env === 'development' || env === 'production') {
  logger.add(new transports.Console({
    level: 'debug',
    format: format.combine(
      format.errors({ stack: true }),
      format.splat(),
      format.colorize(),
      format.simple()
    )
  }));
} else if (env === "test") {
  logger.add(new transports.File({
    filename: './src/testing/logs/testing.log',
    options: { flags: 'w' },
    level: 'debug',
    format: format.combine(
      format.errors({ stack: true }),
      format.splat(),
      format.colorize(),
      format.simple()
    )
  }));
} 

export { logger }
