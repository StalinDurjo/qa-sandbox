import MockerProject from '@src/service/mocker-request/mocker-project';

const project = new MockerProject({ projectName: 'default' });

project.addMethod({ endpoint: '/bank-details' }, async (data) => {
  return {
    ...((await data.mocker.bankAccount.fullBankDetails()) as Object)
  };
});

project.addMethod({ endpoint: '/user-details' }, async (data) => {
  return {
    ...((await data.mocker.person.fullPersonDetails()) as Object)
  };
});

project.addMethod({ endpoint: '/full-user-details' }, async (data) => {
  return {
    ...((await data.mocker.person.fullPersonDetails()) as Object),
    ...((await data.mocker.location.structuredAddress()) as Object),
    ...((await data.mocker.employment.fullEmploymentDetails()) as Object),
    ...((await data.mocker.bankAccount.fullBankDetails()) as Object)
  };
});

export default project;
