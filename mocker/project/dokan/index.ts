import { database } from '@src/service/database';
import MockerProject from '@src/service/mocker-request/mocker-project';

const project = new MockerProject({ projectName: 'dokan' });

project.addMethod({ endpoint: '/vendor-store' }, async (data) => {
  const mocker = data.mocker;
  const counter = await database.incrementCount();

  return {
    firstName: 'Vendor',
    lastName: `Shop${counter}`,
    email: `vendor${counter}@mailinator.com`,
    password: '01Dokan01!',
    storeName: `vendor${counter}shop`,
    phoneNumber: await mocker.person.phoneNumber(),
    country: await mocker.location.countryName(),
    state: await mocker.location.subdivision(),
    postcode: await mocker.location.postcode(),
    address: await mocker.location.streetAddress()
  };
});

export default project;
