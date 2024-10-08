import { database } from '@src/service/local-database';
import BaseMocker from '../../base-mocker';
import { randomize } from '@src/lib/util/util';

export default class PersonModule extends BaseMocker {
  private _personData: Promise<unknown>;

  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phoneNumber: string;
  private _nationality: string;
  private _ssn: string;
  private _nationalId: string;
  private _dateOfBirth: Date;
  private _age: number;
  private _height: number;
  private _weight: number;
  private _bloodType: string;
  private _eyeColor: string;
  private _hairColor: string;

  constructor(country: string) {
    super(country);
  }

  async loadPerson() {
    try {
      if (!this.isSupported) return;

      const query = `
        SELECT *
        FROM person
        WHERE country_alpha2 = '${this.baseCountry}';
      `;

      this._personData = randomize(await database.all(query));

      this._firstName = this._personData['first_name'];
      this._lastName = this._personData['last_name'];
      this._email = this._personData['email'];
      this._phoneNumber = this._personData['phone_number'];
      this._nationality = this._personData['nationality'];
      this._ssn = this._personData['ssn'];
      this._nationalId = this._personData['national_id'];
      this._dateOfBirth = new Date(this._personData['date_of_birth']);
      this._age = this._personData['age'];
      this._height = this._personData['height_cm'];
      this._weight = this._personData['weight_kg'];
      this._bloodType = this._personData['blood_type'];
      this._eyeColor = this._personData['eye_color'];
      this._hairColor = this._personData['hair_color'];

      return this._personData;
    } catch (error) {
      console.error(`Error fetching person data for ${this.baseCountry}:`, error);
      return;
    }
  }

  async firstName() {
    return this.isSupported ? this._firstName : this._faker[this.baseCountry]?.person.firstName();
  }

  async lastName() {
    return this.isSupported ? this._lastName : this._faker[this.baseCountry]?.person.lastName();
  }

  async email() {
    return this.isSupported ? this._email : this._faker[this.baseCountry]?.internet.email();
  }

  async phoneNumber() {
    return this.isSupported ? this._phoneNumber : this._faker[this.baseCountry]?.phone.number();
  }

  async nationality() {
    return this.isSupported ? this._nationality : this._faker[this.baseCountry]?.location.country();
  }

  async ssn() {
    // return this.isSupported ? this._ssn : this._faker[this.baseCountry]?.helpers.replaceSymbolWithNumber('###-##-####');
  }

  async dateOfBirth() {
    return this.isSupported ? this._dateOfBirth : this._faker[this.baseCountry]?.date.birthdate();
  }

  async age() {
    return this.isSupported ? this._age : this._faker[this.baseCountry]?.number.int({ min: 18, max: 90 });
  }

  // Add more methods for other person attributes as needed
}
