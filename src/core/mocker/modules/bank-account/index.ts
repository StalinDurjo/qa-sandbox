import { database } from 'src/core/database';
import BaseMocker from '../../base';
import { randomize } from '@src/lib/util/util';

export default class BankAccountModule extends BaseMocker {
  private _accountData: Promise<unknown>;

  private _bankName: string;
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

  async load() {
    try {
      if (!this.isSupported) return;

      const query = `
        SELECT account_type, currency, account_number, routing_number, iban, sort_code, bsb_number, bank.name AS bank_name
        FROM bank_account
        JOIN bank ON bank_account.bank_id = bank.id
        WHERE bank.country_alpha2 = '${this.baseCountry}';
      `;

      this._accountData = randomize(await database.all(query));

      this._bankName = this._accountData['bank_name'];
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

  async bankName() {
    return this.isSupported ? this._bankName : this._faker[this.baseCountry]?.company.name();
  }

  async accountType() {
    return this.isSupported ? this._accountType : this._faker[this.baseCountry]?.finance.accountName();
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
    return this.isSupported ? this._sortCode : this._faker[this.baseCountry]?.finance.pin(6);
  }

  async bsbNumber() {
    return this.isSupported ? this._bsbNumber : this._faker[this.baseCountry]?.finance.pin(6);
  }

  async fullBankDetails() {
    return {
      bank_name: await this.bankName(),
      account_type: await this.accountType(),
      currency: await this.currency(),
      account_number: await this.accountNumber(),
      routing_number: await this.routingNumber(),
      iban: await this.iban(),
      sort_code: await this.sortCode(),
      bsb_number: await this.bsbNumber()
    };
  }
}
