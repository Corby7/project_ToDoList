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

// Bind the initial Inbox project
bindProjectTasks(inboxProject);

// Example task for Inbox
const task = new Task("Test Task", "Test Description", "2024-09-30", "High");
inboxProject.addTask(task);

// Show initial projects and set the current project to Inbox
uiController.showProjects(projectList.getProjects());
uiController.setCurrentProject(inboxProject, 0);

// Automatically bind new projects when they are added
projectList.bindProjectsChanged((projects) => {
  uiController.showProjects(projects);

  // Ensure that every newly created project is bound
  projects.forEach((project, index) => {
    bindProjectTasks(project);
  });
});
