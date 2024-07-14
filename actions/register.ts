import ActionLoader from '@src/service/workflow/action-loader';

const actionLoader = new ActionLoader();

actionLoader.register({
  projectName: 'p1',
  projectDirectory: './p1'
});

export default actionLoader;
