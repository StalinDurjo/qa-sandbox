import MockerProject from '@src/service/mocker-request/mocker-project';

const project = new MockerProject({ projectName: 'dokan' });

project.addMethod(
  {
    endpoint: '/generate-vendor-data'
  },
  async (data) => {
    return data;
  }
);

export default project;
