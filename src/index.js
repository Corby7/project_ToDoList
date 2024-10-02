import "./style.css";
import { UIController } from "./uiController";
import ProjectList from "./projectList";
import Project from "./project";
import Task from "./task";

// Initialize project list and Inbox project
const projectList = new ProjectList();
const inboxProject = new Project("Inbox");
projectList.addProject(inboxProject);

// Initialize UIController
const uiController = new UIController(projectList);

// Helper function to bind project tasks to UIController
function bindProjectTasks(project) {
  project.bindTasksChanged((tasks) => uiController.showTasks(tasks));
  uiController.bindCompleteTask((index) => project.toggleTaskCompletion(index));
  uiController.bindDeleteTask((index) => project.removeTask(index));
}

bindProjectTasks(inboxProject);

const task = new Task(
  "Test Task",
  "Test Description",
  "2024-10-01T18:11",
  "High"
);
inboxProject.addTask(task);

uiController.showProjects(projectList.getProjects());
uiController.setCurrentProject(inboxProject, 0);

// Automatically bind new projects when they are added
projectList.bindProjectsChanged((projects) => {
  uiController.showProjects(projects);

  projects.forEach((project, index) => {
    bindProjectTasks(project);
  });
});
