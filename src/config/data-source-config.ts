import {DataSource} from 'typeorm';
import envVars from '@src/config/EnvVars';
import {FormEntity} from '@src/adapters/out/storage/entity/Form';
import {FormFieldEntity} from '@src/adapters/out/storage/entity/FormField';
import {AnswerEntity} from '@src/adapters/out/storage/entity/Answer';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envVars.Db.Host,
  port: envVars.Db.Port,
  username: envVars.Db.User,
  password: envVars.Db.Password,
  database: envVars.Db.DbName,
  synchronize: true,
  logging: false,
  entities: [FormEntity, FormFieldEntity, AnswerEntity],
  migrations: [],
  subscribers: [],
  cache: true,
});
