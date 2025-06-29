import config from "../core/config";
import ApplicationServer from '../core/application-server.js';
import DatabaseServer from '../core/database-server.js';
import { normalizePort } from '../features/global/helpers/misc-helpers';
import { logger } from "../features/global/helpers/loggers";
import { DatabaseConfig, AppConfig } from '../core/types/config.types.js';

function connectToDB({ databaseConfig }: { databaseConfig: DatabaseConfig }) {
  return new Promise<void>((resolve, reject) => {
    function onConnectionsSuccess() {
      resolve();
    }

    function onError(err: Error) {
      reject(err);
    }

    new DatabaseServer({
      name: databaseConfig.name,
      username: databaseConfig.username,
      password: databaseConfig.password,
      host: databaseConfig.host,
      dialect: databaseConfig.dialect
    }, onConnectionsSuccess, onError);
  });
};


function createAPPserver({ appConfig }: { appConfig: AppConfig }) {
  return new Promise<void>((resolve, reject) => {
    function onAPPServerCreated() {
      resolve();
    }

    var port = normalizePort(appConfig.port || "3000");

    if (port === false) {
      reject(new Error("Invalid port"));
      return;
    }

    new ApplicationServer(port, onAPPServerCreated);
  });
}


export async function init() {
  const { databaseConfig, appConfig } = config;

  try {
    await connectToDB({ databaseConfig });
    await createAPPserver({ appConfig });

  } catch (err) {
    logger.error("Problem while initializing the app...", err);
    throw err;
  }
}
