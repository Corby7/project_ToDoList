import "./style.css";
import { UIController } from "./uiController";

import Task from "./task";
import ProjectList from "./projectList";
import Project from "./project";

const projectList = new ProjectList();
const inboxProject = new Project("Inbox");
projectList.addProject(inboxProject.name);
//const taskList = inboxProject.taskList;

const uiController = new UIController(inboxProject);

// Example task
const task = new Task("Test Task", "Test Description", "2024-09-30", "High");
inboxProject.addTask(task);
uiController.showProjects(projectList.projects);
uiController.showProjectTitle(inboxProject.name);
uiController.showTasks(inboxProject.taskList.tasks);

// Bind task change handlers
inboxProject.bindTasksChanged((tasks) => uiController.showTasks(tasks));
uiController.bindCompleteTask((index) =>
  inboxProject.toggleTaskCompletion(index)
);
uiController.bindDeleteTask((index) => inboxProject.removeTask(index));
