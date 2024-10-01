export default class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this._notifyChange();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this._notifyChange();
  }

  toggleTaskCompletion(index) {
    const task = this.tasks[index];
    if (task) {
      task.toggleCompletion();
      this._notifyChange();
    }
  }

  _notifyChange() {
    if (this.onTasksChanged) {
      this.onTasksChanged(this.tasks);
    }
  }

  bindTasksChanged(callback) {
    this.onTasksChanged = callback;
  }
}
