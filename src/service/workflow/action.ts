import actionLoader from 'actions/register';

export default class WorkflowActions {
  async actionList(project: string) {
    const actions = (await actionLoader.load()).filter((data) => data['projectName'] === project);

    const [methodObject] = actions.map((data) => {
      return data['properties'];
    });

    const methodList = Object.keys(methodObject)
      .map((key) => methodObject[key].value)
      .filter((item) => typeof item === 'function');

    return methodList;
  }
}
