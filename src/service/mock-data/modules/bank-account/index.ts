import { database } from '@src/service/local-database';
import BaseMocker from '../../base-mocker';
import { randomize } from '@src/lib/util/util';

export default class BankAccountModule extends BaseMocker {
  private _accountData: Promise<unknown>;

  private _accountType: string;
  private _currency: string;
  private _accountNumber: string;
  private _routingNumber: string;
  private _iban: string;
  private _sortCode: string;
  private _bsbNumber: string;

  constructor(country: string) {
    super(country);
  }

  async loadBankAccount() {
    try {
      if (!this.isSupported) return;

      const query = `
        SELECT account_type, currency, account_number, routing_number, iban, sort_code, bsb_number
        FROM bank_account
        JOIN bank ON bank_account.bank_id = bank.id
        WHERE bank.country_alpha2 = '${this.baseCountry}';
      `;

      this._accountData = randomize(await database.all(query));

      this._accountType = this._accountData['account_type'];
      this._currency = this._accountData['currency'];
      this._accountNumber = this._accountData['account_number'];
      this._routingNumber = this._accountData['routing_number'];
      this._iban = this._accountData['iban'];
      this._sortCode = this._accountData['sort_code'];
      this._bsbNumber = this._accountData['bsb_number'];

      return this._accountData;
    } catch (error) {
      console.error(`Error fetching bank account data for ${this.baseCountry}:`, error);
      return;
    }
  }

  async accountType() {
    // return this.isSupported ? this._accountType : this._faker[this.baseCountry]?.finance.accountType();
  }

  async currency() {
    return this.isSupported ? this._currency : this._faker[this.baseCountry]?.finance.currency().code;
  }

  async accountNumber() {
    return this.isSupported ? this._accountNumber : this._faker[this.baseCountry]?.finance.accountNumber();
  }

  async routingNumber() {
    return this.isSupported ? this._routingNumber : this._faker[this.baseCountry]?.finance.routingNumber();
  }

  async iban() {
    return this.isSupported ? this._iban : this._faker[this.baseCountry]?.finance.iban();
  }

  async sortCode() {
    // return this.isSupported ? this._sortCode : this._faker[this.baseCountry]?.finance.sortCode();
  }

  async bsbNumber() {
    // return this.isSupported ? this._bsbNumber : this._faker[this.baseCountry]?.finance.bsbNumber();
  }
}
