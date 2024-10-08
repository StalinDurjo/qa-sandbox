import { createFileSync } from '@src/lib/util/file';
import LocalDatabase from './local-database';
import { LOCAL_DATABASE } from '@src/constant';

export const database = new LocalDatabase();

export const initializeDatabase = async () => {
  // create database if it does not exist
  createFileSync(LOCAL_DATABASE, process.cwd() + '/out/');

  // create database tables
  await database.exec(__dirname + '/tables.sql');
};
