import MockProject from '@src/service/mock-request/mock-project';

const project = new MockProject({ projectName: 'dokan' });

project.add({
  endpoint: '/demo-endpoint',
  locale: 'US',
  callback: async (data: unknown) => {
    console.log(data['payload']);
    console.log(data['mocker']);
    return data;
  }
});

export default project;
