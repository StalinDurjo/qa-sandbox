import MockerProject from '@src/service/mocker-request/mocker-project';

const project = new MockerProject({ projectName: 'default' });

project.addMethod({ endpoint: '/generate-data' }, async (data) => {
  const mock = {};
  mock['firstName'] = await data.mocker.person.firstName();
  mock['lastName'] = await data.mocker.person.lastName();
  mock['lastEmail'] = await data.mocker.person.email();
  mock['phoneNumber'] = await data.mocker.person.phoneNumber();
  mock['nationality'] = await data.mocker.person.nationality();
  mock['dateOfBirth'] = await data.mocker.person.dateOfBirth();
  mock['age'] = await data.mocker.person.age();

  mock['country'] = await data.mocker.location.countryName();
  mock['division'] = await data.mocker.location.division();
  mock['subdivision'] = await data.mocker.location.subdivision();
  mock['city'] = await data.mocker.location.city();
  mock['streetAddress'] = await data.mocker.location.streetAddress();
  mock['postCode'] = await data.mocker.location.postcode();
  mock['fullAddress'] = await data.mocker.location.fullAddress();

  mock['bankAccountType'] = await data.mocker.bankAccount.accountType();
  mock['bankCurrency'] = await data.mocker.bankAccount.currency();

  return mock;
});

export default project;
