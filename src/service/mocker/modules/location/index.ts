import { database } from '@src/service/local-database';
import BaseMocker from '../../base';
import { randomize } from '@src/lib/util/util';

export default class LocationModule extends BaseMocker {
  private _locationData: Promise<unknown>;

  private _division: string;
  private _subdivision: string;
  private _city: string;
  private _streetAddress: string;
  private _postcode: any;

  constructor(country: string) {
    super(country);
  }

  async load() {
    try {
      if (!this.isSupported) return;

      const query = `
        SELECT division.name as division, 
               subdivision.name as subdivision, 
               address.city, 
               address.street_address, 
               post_code.code as postcode
        FROM division
        LEFT JOIN subdivision ON subdivision.division_id = division.id
        LEFT JOIN address ON address.country_alpha2 = division.country_alpha2
        LEFT JOIN post_code ON post_code.subdivision_id = subdivision.id
        WHERE division.country_alpha2 = '${this.baseCountry}';
      `;

      this._locationData = randomize(await database.all(query));

      this._division = this._locationData['division'];
      this._subdivision = this._locationData['subdivision'];
      this._city = this._locationData['city'];
      this._streetAddress = this._locationData['street_address'];
      this._city = this._locationData['city'];
      this._postcode = this._locationData['postcode'];

      return this._locationData;
    } catch (error) {
      console.error(`Error fetching location data for ${this.baseCountry}:`, error);
      return;
    }
  }

  async countryName() {
    if (this.isSupported) {
      const [data] = await database.all(`SELECT name FROM country WHERE alpha2 = '${this.baseCountry}';`);
      return data['name'];
    } else {
      return this._faker[this.baseCountry]?.location.country();
    }
  }

  async division() {
    return this.isSupported ? this._division : this._faker[this.baseCountry]?.location.state();
  }

  async subdivision() {
    return this.isSupported ? this._subdivision : this._faker[this.baseCountry]?.location.county();
  }

  async city() {
    return this.isSupported ? this._city : this._faker[this.baseCountry]?.location.city();
  }

  async streetAddress() {
    return this.isSupported ? this._streetAddress : this._faker[this.baseCountry]?.location.streetAddress();
  }

  async postcode() {
    return this.isSupported ? this._postcode : this._faker[this.baseCountry]?.location.zipCode();
  }

  async fullAddress() {
    return this.isSupported
      ? `${this._streetAddress}, ${this._city}, ${this._postcode}, ${this.baseCountry}`
      : this._faker[this.baseCountry]?.location.streetAddress({ useFullAddress: true });
  }
}
