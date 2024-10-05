import LocationModule from './modules/location';

export default class Mocker {
  readonly location: LocationModule;

  constructor(country: string) {
    this.location = new LocationModule(country);
  }

  async initialize() {
    await this.location.loadLocation();
    return this;
  }
}
