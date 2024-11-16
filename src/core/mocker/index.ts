import { database } from '../../core/database';

(async () => {
  const countryTable = await database.all(`SELECT * FROM country;`);
  if (countryTable.length === 0) await database.exec(__dirname + '/queries/country.sql');

  const divisionTable = await database.all(`SELECT * FROM division;`);
  if (divisionTable.length === 0) await database.exec(__dirname + '/queries/division.sql');

  const subdivisionTable = await database.all(`SELECT * FROM subdivision;`);
  if (subdivisionTable.length === 0) await database.exec(__dirname + '/queries/subdivision.sql');

  const postcodeTable = await database.all(`SELECT * FROM post_code;`);
  if (postcodeTable.length === 0) await database.exec(__dirname + '/queries/postcode.sql');

  const addressTable = await database.all(`SELECT * FROM address;`);
  if (addressTable.length === 0) await database.exec(__dirname + '/queries/address.sql');

  const personTable = await database.all(`SELECT * FROM person;`);
  if (personTable.length === 0) await database.exec(__dirname + '/queries/person.sql');

  const employmentTable = await database.all(`SELECT * FROM employment;`);
  if (employmentTable.length === 0) await database.exec(__dirname + '/queries/employment.sql');

  const bankTable = await database.all(`SELECT * FROM bank;`);
  if (bankTable.length === 0) await database.exec(__dirname + '/queries/bank.sql');

  const bankAccountTable = await database.all(`SELECT * FROM bank_account;`);
  if (bankAccountTable.length === 0) await database.exec(__dirname + '/queries/bank-account.sql');
})();
