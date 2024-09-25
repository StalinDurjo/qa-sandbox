import { faker, fakerEN } from '@faker-js/faker';

export default class MockData {
  test() {
    console.log(faker.location.state());
  }

  generate({ properties }: { properties?: string[] }) {
    let data: any = {};

    if (properties?.includes('firstName')) {
      data['firstName'] = faker.person.firstName();
    }

    if (properties?.includes('lastName')) {
      data['lastName'] = faker.person.lastName();
    }

    if (properties?.includes('fullName')) {
      const fullName: string = `${data['firstName'] ? data['firstName'] : ''} ${data['lastName'] ? data['lastName'] : ''}`;

      data['fullName'] = fullName.trim();
    }

    if (properties?.includes('country')) {
      data['country'] = faker.location.country();
    }

    if (properties?.includes('state')) {
      data['state'] = faker.location.state();
    }

    console.log(data);
  }
}
