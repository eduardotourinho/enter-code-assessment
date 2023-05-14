/**
 * Environments variables declared here.
 */
/* eslint-disable node/no-process-env */
import * as process from 'process';

export default {
  NodeEnv: (process.env.NODE_ENV ?? ''),
  Port: (process.env.PORT ?? 3000),
  Db: {
    Host: (process.env.DB_HOST ?? 'localhost'),
    Port: parseInt(process.env.DB_PORT ?? '5432'),
    User: (process.env.DB_USER ?? 'postgres'),
    Password: (process.env.DB_PASSWORD ?? 'postgres'),
    DbName: (process.env.DB_NAME ?? 'postgres'),
  },
} as const;
