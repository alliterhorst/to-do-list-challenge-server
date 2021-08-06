import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { TaskModel } from '../model/task.model';
import { TaskHistoryModel } from '../model/task-history.model';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  port: +DB_PORT,
  logging: false,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dialectOptions: {
    options: {
      encrypt: true,
      requestTimeout: 300000,
    },
  },
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  timezone: '-03:00',
};
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (): Promise<Sequelize> => {
      const sequelize = new Sequelize(sequelizeOptions);
      sequelize.addModels([TaskModel, TaskHistoryModel]);
      return sequelize;
    },
  },
];
