import './pre-start';
import '@src/config/ioc-config';

import logger from 'jet-logger';

import server from '@src/server';
import EnvVars from '@src/config/EnvVars';
import {AppDataSource} from '@src/config/data-source-config';


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

