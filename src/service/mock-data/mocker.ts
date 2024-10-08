import LocationModule from './modules/location';

export default class Mocker {
  readonly location: LocationModule;

  constructor({ locale }: { locale: string }) {
    this.location = new LocationModule(locale);
  }

  async initialize() {
    await this.location.loadLocation();
    return this;
  }
}
