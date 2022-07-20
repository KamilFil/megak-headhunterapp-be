import { DataSourceOptions } from 'typeorm';

export const dbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'megak_headhunterapp',
  entities: ['./dist/**/**.entity{.ts,.js'],
  bigNumberStrings: false,
  logging: true,
  synchronize: true,
} as DataSourceOptions;
