import { database } from '../local-database';

export const initializeMockData = async () => {
  await database.exec(__dirname + '/queries/country.sql');
  await database.exec(__dirname + '/queries/division.sql');
  await database.exec(__dirname + '/queries/subdivision.sql');
  await database.exec(__dirname + '/queries/postcode.sql');
  await database.exec(__dirname + '/queries/address.sql');
};
