export default class Project1 {
  projectName: string;
  constructor() {
    // console.log('project 1');
  }

  projectInfo() {
    this.projectName = 'project1';
    return { projectName: this.projectName };
  }

  changePermalink() {
    console.log('change permalink action');
  }

  setAnyoneCanRegister() {
    console.log('set anyone can register action');
  }
}
