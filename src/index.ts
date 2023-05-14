import './pre-start';
import logger from 'jet-logger';

import EnvVars from '@src/config/EnvVars';
import {AppDataSource} from '@src/config/data-source-config';
import server from './server';

// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' +
  EnvVars.Port.toString());

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error));
