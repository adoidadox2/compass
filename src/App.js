import 'dotenv/config';
import 'express-async-errors';
import './databases';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';
import { AppError } from './errors';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  errors() {
    this.server.use((error, request, response, next) => {
      if (error instanceof AppError) {
        const result = {};

        if (error.message) {
          result.message = error.message;
        }

        if (error.data) {
          result.data = error.data;
        }

        return response.status(error.statusCode).json(result);
      }

      console.error(error);

      return response.status(500).json({ message: 'Internal server error' });
    });
  }
}

export default new App().server;
