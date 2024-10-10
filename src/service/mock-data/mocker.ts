import BankModule from './modules/bank';
import BankAccountModule from './modules/bank-account';
import EmploymentModule from './modules/employment';
import LocationModule from './modules/location';
import PersonModule from './modules/person';

export default class Mocker {
  readonly location: LocationModule;
  readonly bank: BankModule;
  readonly bankAccount: BankAccountModule;
  readonly employment: EmploymentModule;
  readonly person: PersonModule;

  constructor({ locale }: { locale: string }) {
    this.location = new LocationModule(locale);
    this.bank = new BankModule(locale);
    this.bankAccount = new BankAccountModule(locale);
    this.employment = new EmploymentModule(locale);
    this.person = new PersonModule(locale);
  }

  async initialize() {
    await this.location.load();
    await this.bank.load();
    await this.bankAccount.load();
    await this.employment.load();
    await this.person.load();
    return this;
  }
}
