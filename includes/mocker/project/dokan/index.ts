import { database } from 'src/core/database';

export async function fullUserDetails({ endpoint = '/vendor-store', data }) {
  const mocker = data.mocker;
  const counter = await database.incrementCount();
  const location = await mocker.location.structuredAddress();

  return {
    firstName: 'Vendor',
    lastName: `Shop${counter}`,
    email: `vendor${counter}@mailinator.com`,
    password: '01Dokan01!',
    storeName: `vendor${counter}shop`,
    phoneNumber: await mocker.person.phoneNumber(),
    country: location['country'],
    alpha2: location['alpha2'],
    division: location['division'],
    subdivision: location['subdivision'],
    city: location['city'],
    postcode: location['postCode'],
    address: location['fullAddress']
  };
}
