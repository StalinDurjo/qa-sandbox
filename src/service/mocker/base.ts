import { Faker, faker, fakerEN_CA, fakerEN_IN } from '@faker-js/faker';
import { localeSupportList } from '@src/constant';
import { randomize } from '@src/lib/util/util';

export default class BaseMocker {
  protected isSupported: boolean;

  protected _faker: { [key: string]: Faker } = {
    US: faker,
    CA: fakerEN_CA,
    IN: fakerEN_IN
  };

  protected baseCountry: string;

  constructor(country: string) {
    // this.baseCountry = country || 'US';
    this.baseCountry = country || randomize(localeSupportList);
    this.isSupported = localeSupportList.includes(this.baseCountry);
  }
}
