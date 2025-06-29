import express from "express";
import http from "http";
import morgan from 'morgan';
import cors from "cors";
import { logger } from "../features/global/helpers/loggers";
import { setupRouting } from "./routing/routes";
import setupGlobalErrorHandler from "./middlewares/global-error-handler";
import config from "./config";

export default class ApplicationServer {
  port: number | string;
  server: http.Server;
  onDone: () => void;

  constructor(port: number | string, onDone: () => void) {
    const app = express();
    this.onDone = onDone;

    app.set('port', port);
    this.port = port;

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Only use Morgan logger in non-test environments
    if (config.env !== 'test') {
      app.use(morgan('dev'));
    }
    
    app.use(cors());

    //  Setup middlewares per request
    //   |
    //   |
    //   |
    //   V

    setupRouting(app);
    setupGlobalErrorHandler(app);

    this.server = http.createServer(app);
    this.server.listen(port);
    this.server.on('error', (e) => this.onError(e));
    this.server.on('listening', () => this.onListening());
  }

  onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    logger.error("HTTP Server Error");

    const bind = typeof this.port === 'string'
      ? 'Pipe ' + this.port
      : 'Port ' + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'ECONNREFUSED':
        logger.error("ECONNREFUSED thrown");
        process.exit(1);
        break;
      case 'EACCES':
        logger.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  onListening(): void {
    const addr = this.server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr?.port;
    logger.info(`Application Server Listening on ${bind}`);
    this.onDone();
  }
}