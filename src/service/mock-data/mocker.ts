import { Faker, faker, fakerEN_CA, fakerEN_IN } from '@faker-js/faker';

const _fakerCountries = ['US', 'Canada'];

const _faker: { [key: string]: Faker } = {
  base: faker,
  canada: fakerEN_CA,
  india: fakerEN_IN
};

export default class Mocker {
  private country: string;

  constructor(country: string) {
    this.country = country;
  }

  firstName() {
    return _faker[this.country].person.firstName;
  }
}
