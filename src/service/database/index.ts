import { createDirectorySync, createFileSync } from '@src/lib/util/file';
import Database from './database';
import { LOCAL_DATABASE } from '@src/constant';

export const database = new Database();

export const initializeDatabase = async () => {
  // create database if it does not exist
  createDirectorySync(process.cwd() + '/out/');
  createFileSync(LOCAL_DATABASE, process.cwd() + '/out/');

  // create database tables
  await database.exec(__dirname + '/tables.sql');
};
