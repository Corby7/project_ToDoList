import "./style.css";
import { UIController } from "./uiController";
import TaskList from "./taskList";
import Task from "./task";

const taskList = new TaskList();
const uiController = new UIController(taskList);

const task = new Task("Test Task", "Test Description", "2024-09-30", "High");
taskList.addTask(task);
uiController.showTasks(taskList.tasks);

taskList.bindTasksChanged((tasks) => uiController.showTasks(tasks));

uiController.bindCompleteTask((index) => taskList.toggleTaskCompletion(index));
uiController.bindDeleteTask((index) => taskList.removeTask(index));
