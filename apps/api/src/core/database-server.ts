import { SequelizeConnection } from "../db/init-db-connection";
import { logger } from "../features/global/helpers/loggers";
import { DatabaseConfig } from "./types/config.types";
import { Dialect } from 'sequelize';

export default class DatabaseServer {
    onDone: () => void;
    onError: (err: Error) => void;
    sequelizeConnection: SequelizeConnection | undefined;

    constructor(options: DatabaseConfig, onDone: () => void, onError: (err: Error) => void) {
        this.connect(options);
        this.onDone = onDone;
        this.onError = onError;
    }

    async testConnection() {
        return await this.sequelizeConnection?.sequelize.authenticate();
    }

    async connect(config: DatabaseConfig) {
        try {
            this.sequelizeConnection = new SequelizeConnection({
                database: config.name,
                username: config.username,
                password: config.password,
                dbConfig: {
                    host: config.host,
                    dialect: config.dialect as Dialect,
                    pool: {
                        max: 30,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    },
                }
            });


            this.sequelizeConnection.setupModels();
            await this.testConnection();

            logger.info('Testing database connection success. Database is successfully connected');
            this.onDone();
        } catch (err) {
            logger.error("Error connecting to database: ", err);
            this.onError(err as Error);
        }
    }
}
