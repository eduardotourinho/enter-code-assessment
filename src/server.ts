/**
 * Setup express server.
 */
import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from '@src/adapters/in/api/api';
import Paths from '@src/adapters/in/api/constants/Paths';

import EnvVars from '@src/config/EnvVars';
import HttpStatusCodes from '@src/adapters/in/api/constants/HttpStatusCodes';

import { NodeEnvs } from '@src/adapters/in/api/constants/misc';
import { RouteError } from '@src/adapters/in/api/models/RouteError';


// **** Variables **** //

const app = express();


// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

export default app;
