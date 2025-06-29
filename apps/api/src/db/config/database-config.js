const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const databaseConfig = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
};

module.exports = {
  development: databaseConfig,
  test: databaseConfig,
};
