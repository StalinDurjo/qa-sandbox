import MockProject from '@src/service/mock-request/mock-project';

const project = new MockProject({ projectName: 'default' });

project.add({
  endpoint: '/default-endpoint',
  locale: 'US',
  callback: (req, res) => {
    const _request = req.body;

    console.log(_request);
    console.log('hello');
  }
});

export default project;
