import { Faker, faker, fakerEN_CA, fakerEN_IN } from '@faker-js/faker';
import { localeMockerSupportList } from '@src/constant';

export default class BaseMocker {
  protected isSupported: boolean;

  protected _faker: { [key: string]: Faker } = {
    US: faker,
    CA: fakerEN_CA,
    IN: fakerEN_IN
  };

  protected baseCountry: string;

  constructor(country: string) {
    this.baseCountry = country;
    this.isSupported = localeMockerSupportList.includes(this.baseCountry);
  }
}
