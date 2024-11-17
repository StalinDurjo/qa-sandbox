import { database } from 'src/core/database';
import BaseMocker from '../../base';
import { randomize } from '@src/lib/util/util';

export default class BankModule extends BaseMocker {
  private _bankData: Promise<unknown>;

  private _name: string;
  private _swiftCode: string;
  private _bic: string;

  constructor(country: string) {
    super(country);
  }

  async load() {
    try {
      if (!this.isSupported) return;

      const query = `
        SELECT name, swift_code, bic
        FROM bank
        WHERE country_alpha2 = '${this.baseCountry}';
      `;

      this._bankData = randomize(await database.all(query));

      this._name = this._bankData['name'];
      this._swiftCode = this._bankData['swift_code'];
      this._bic = this._bankData['bic'];

      return this._bankData;
    } catch (error) {
      console.error(`Error fetching bank data for ${this.baseCountry}:`, error);
      return;
    }
  }

  async name() {
    return this.isSupported ? this._name : this._faker[this.baseCountry]?.company.name();
  }

  async swiftCode() {
    return this.isSupported ? this._swiftCode : this._faker[this.baseCountry]?.finance.bic();
  }

  async bic() {
    return this.isSupported ? this._bic : this._faker[this.baseCountry]?.finance.bic();
  }
}
