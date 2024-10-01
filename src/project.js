import TaskList from "./taskList";

export default class Project {
  constructor(name) {
    this.name = name;
    this.taskList = new TaskList();
  }

  addTask(task) {
    this.taskList.addTask(task);
  }

  removeTask(index) {
    this.taskList.removeTask(index);
  }

  toggleTaskCompletion(index) {
    this.taskList.toggleTaskCompletion(index);
  }

  getTasks() {
    return this.taskList.tasks;
  }

  bindTasksChanged(callback) {
    this.taskList.bindTasksChanged(callback);
  }
}
