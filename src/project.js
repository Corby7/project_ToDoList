import TaskList from "./taskList";

export default class Project {
  constructor(name) {
    this.name = name;
    this.taskList = new TaskList();
    this.taskList.bindTasksChanged((tasks) => {
      if (this.onTasksChanged) {
        this.onTasksChanged(tasks);
      }
    });
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

  bindTasksChanged(callback) {
    this.onTasksChanged = callback;
  }
}
