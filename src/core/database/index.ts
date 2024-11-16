import { createDirectorySync, createFileSync } from '@src/lib/util/file';
import Database from './database';
import { LOCAL_DATABASE } from '@src/constant';

export const database = new Database();

export const initializeDatabase = async () => {
  try{
    createDirectorySync(process.cwd() + '/out/');
    // create database if it does not exist
    createFileSync(LOCAL_DATABASE, process.cwd() + '/out/');
    // create database tables
    await database.exec(__dirname + '/tables.sql');
  }catch(error){
    console.log(error)
  }
};
