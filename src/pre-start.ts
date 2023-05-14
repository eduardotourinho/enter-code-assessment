/**
 * Pre-start is where we want to place things that must run BEFORE the express 
 * server is started. This is useful for environment variables, command-line 
 * arguments, and cron-jobs.
 */
import 'reflect-metadata';
import path from 'path';
import { parse } from 'ts-command-line-args';
import dotenv from 'dotenv';

// **** Types **** //

interface IArgs {
  env: string;
}


// **** Setup **** //
// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: 'development',
    alias: 'e',
  },
});

// Set the env file
const result2 = dotenv.config({
  path: path.join(__dirname, `../env/${args.env}.env`),
});
if (result2.error) {
  throw result2.error;
}
