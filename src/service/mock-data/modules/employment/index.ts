import { database } from '@src/service/local-database';
import BaseMocker from '../../base-mocker';
import { randomize } from '@src/lib/util/util';

export default class EmploymentModule extends BaseMocker {
  private _employmentData: Promise<unknown>;

  private _company: string;
  private _jobTitle: string;
  private _occupation: string;
  private _startDate: Date;
  private _endDate: Date | null;
  private _isCurrentJob: boolean;

  constructor(country: string) {
    super(country);
  }

  async loadEmployment() {
    try {
      if (!this.isSupported) return;

      const query = `
        SELECT e.*
        FROM employment e
        JOIN person p ON e.user_id = p.id
        WHERE p.country_alpha2 = '${this.baseCountry}';
      `;

      this._employmentData = randomize(await database.all(query));

      this._company = this._employmentData['company'];
      this._jobTitle = this._employmentData['job_title'];
      this._occupation = this._employmentData['occcupation'];
      this._startDate = new Date(this._employmentData['start_date']);
      this._endDate = this._employmentData['end_date'] ? new Date(this._employmentData['end_date']) : null;
      this._isCurrentJob = this._employmentData['is_current_job'];

      return this._employmentData;
    } catch (error) {
      console.error(`Error fetching employment data for ${this.baseCountry}:`, error);
      return;
    }
  }

  async company() {
    return this.isSupported ? this._company : this._faker[this.baseCountry]?.company.name();
  }

  async jobTitle() {
    return this.isSupported ? this._jobTitle : this._faker[this.baseCountry]?.person.jobTitle();
  }

  async occupation() {
    return this.isSupported ? this._occupation : this._faker[this.baseCountry]?.person.jobType();
  }

  async startDate() {
    return this.isSupported ? this._startDate : this._faker[this.baseCountry]?.date.past();
  }

  async endDate() {
    return this.isSupported ? this._endDate : this._isCurrentJob ? null : this._faker[this.baseCountry]?.date.recent();
  }

  async isCurrentJob() {
    return this.isSupported ? this._isCurrentJob : this._faker[this.baseCountry]?.datatype.boolean();
  }
}
