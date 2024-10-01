import Project from "./project";

export default class ProjectList {
  constructor() {
    this.projects = [];
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    this._notifyChange();
  }

  removeProject(index) {
    this.projects.splice(index, 1);
    this._notifyChange();
  }

  getProjects() {
    return this.projects;
  }

  getProject(index) {
    return this.projects[index];
  }

  _notifyChange() {
    if (this.onProjectsChanged) {
      this.onProjectsChanged(this.projects);
    }
  }

  bindProjectsChanged(callback) {
    this.onProjectsChanged = callback;
  }
}
