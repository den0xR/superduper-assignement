import { Sequelize, Dialect } from 'sequelize';
import config from '../core/config';

interface SequelizeConnectionProps {
    database: string;
    username: string;
    password: string;
    dbConfig: {
        host: string;
        dialect: Dialect;
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        }
    }
}

export class SequelizeConnection {
    sequelize: Sequelize;

    constructor({ database, username, password, dbConfig }: SequelizeConnectionProps) {
        const logging = config.env === 'test' ? false : console.log;
        
        this.sequelize = new Sequelize(database, username, password, {
            ...dbConfig,
            logging
        });
    }
}

