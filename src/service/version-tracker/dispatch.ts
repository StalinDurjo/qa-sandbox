import { DependencyRecord } from './db-query';

export class VersionTrackerMessageDispatcher {
  private dispatchableMessageList = new Map();

  collect(dependency: string, data: DependencyRecord) {
    this.dispatchableMessageList.set(dependency, data);
  }

  async dispatch(channel: string = 'email') {
    for (const [dependency, data] of this.dispatchableMessageList) {
      console.log(dependency, data);
      const updateData = data;

      const message = `
        \n=====================================================
        \nDependency: ${dependency} is updated.
        \nDependency Version: ${updateData['pluginVersion']}
        \nWordpress Version: ${updateData['wordpressVersion']}
        \nPHP Version: ${updateData['phpVersion']}
        \n=====================================================
      `;
      console.log(message);
    }
  }

  clearCollection() {
    this.dispatchableMessageList.clear();
  }
}
