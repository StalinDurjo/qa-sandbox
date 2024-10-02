import { createFileSync } from '@src/lib/util/file';
import LocalDB from './local-db';
import { LOCAL_DATABASE } from '@src/constant';

export const localdb = new LocalDB();

export const initializeDatabase = async () => {
  // create database if it does not exist
  createFileSync(LOCAL_DATABASE, process.cwd() + '/out/');

  // create database tables
  await localdb.exec(__dirname + '/tables.sql');
};
