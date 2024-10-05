import { database } from '../local-database';

export default class MockQuery {
  async country() {
    const countries = await database.all('SELECT * FROM country');
    return countries.map((country) => country['name']);
  }

  async division() {
    const divisions = await database.all('SELECT * FROM division');
    return divisions.map((division) => division['name']);
  }

  async subdivision() {
    const subdivisions = await database.all('SELECT * FROM subdivision');
    return subdivisions.map((subdivision) => subdivision['name']);
  }

  async postcode() {
    const postcodes = await database.all('SELECT * FROM post_code');
    return postcodes.map((postcode) => postcode['code']);
  }

  async address() {
    const addresses = await database.all('SELECT * FROM address');
    return addresses.map((address) => `${address['street_address']}, ${address['city']}, ${address['post_code']}`);
  }
}
