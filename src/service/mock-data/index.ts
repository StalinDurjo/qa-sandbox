import { localdb } from '../local-db';

export const initializeMockData = async () => {
  await localdb.exec(__dirname + '/queries/country.sql');
  await localdb.exec(__dirname + '/queries/division.sql');
  await localdb.exec(__dirname + '/queries/subdivision.sql');
  await localdb.exec(__dirname + '/queries/postcode.sql');
  await localdb.exec(__dirname + '/queries/address.sql');
};
