import Task from "./task.js";

export class UIController {
  constructor(taskList) {
    this.taskList = taskList;

    this.displayList = document.getElementById("list");
    this.newTaskForm = this.createTaskForm();

    this.newTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    this.addToDoBtn = document.getElementById("addToDo");
    this.addToDoBtn.addEventListener("click", () => {
      this.toggleFormDisplay(this.newTaskForm);
    });
  }

  showTasks(tasks) {
    this.displayList.innerHTML = "";

    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.className = "toDo";

      const title = document.createElement("h1");
      title.innerText = task.title;

      const description = document.createElement("p");
      description.className = "description";
      description.innerText = task.description;

      const dueDate = document.createElement("p");
      dueDate.innerText = task.dueDate;

      const priority = document.createElement("p");
      priority.innerText = task.priority;

      const completed = document.createElement("button");
      completed.classList.add("completedBtn");

      const uncheckedSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>circle-outline</title>
        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20Z" />
      </svg>
    `;

      const checkedSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>check-circle-outline</title>
        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
      </svg>`;

      completed.innerHTML = task.completed ? checkedSVG : uncheckedSVG;

      completed.addEventListener("click", () => {
        completed.innerHTML = task.completed ? checkedSVG : uncheckedSVG;
        this.onTaskComplete(index);
        console.log(task.completed);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "deleteToDo";
      deleteBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>delete-circle</title>
              <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" />
          </svg>
      `;
      deleteBtn.addEventListener("click", () => {
        this.onTaskDelete(index);
      });

      // Add click event to expand/collapse the list item
      listItem.addEventListener("click", (e) => {
        if (listItem.classList.contains("expanded")) {
          listItem.classList.remove("expanded");
        } else {
          this.collapseAll(); // Collapse other expanded items
          listItem.classList.add("expanded");
        }
      });

      // Add elements to list item
      listItem.appendChild(completed);
      listItem.appendChild(title);
      listItem.appendChild(description);
      listItem.appendChild(priority);
      listItem.appendChild(dueDate);
      listItem.appendChild(deleteBtn);

      // Append list item to the display list
      this.displayList.appendChild(listItem);
    });
  }

  collapseAll() {
    const items = document.querySelectorAll(".toDo.expanded");
    items.forEach((item) => {
      item.classList.remove("expanded");
    });
  }

  bindCompleteTask(handler) {
    this.onTaskComplete = handler;
  }

  bindDeleteTask(handler) {
    this.onTaskDelete = handler;
  }

  handleFormSubmit() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    const newTask = new Task(title, description, dueDate, priority); // Create a new Task instance
    this.taskList.addTask(newTask); // Add the new task to the TaskList

    this.newTaskForm.reset();
    this.toggleFormDisplay(this.newTaskForm);
  }

  createTaskForm() {
    const form = document.createElement("form");
    form.id = "newTaskForm";

    const titleField = this.createFormField("Title", "text", "title", true);
    titleField.style.gridArea = "title"; // Assign to grid area
    form.appendChild(titleField);

    const descriptionField = this.createFormField(
      "Description",
      "textarea",
      "description"
    );
    descriptionField.style.gridArea = "description"; // Assign to grid area
    form.appendChild(descriptionField);

    const dueDateField = this.createFormField(
      "Due Date",
      "datetime-local",
      "dueDate"
    );
    dueDateField.style.gridArea = "dueDate"; // Assign to grid area
    form.appendChild(dueDateField);

    const priorityField = this.createFormField("Priority", "text", "priority");
    priorityField.style.gridArea = "priority"; // Assign to grid area
    form.appendChild(priorityField);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteToDo";
    deleteBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>delete-circle</title>
              <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" />
          </svg>
      `;
    deleteBtn.style.gridArea = "delete";
    deleteBtn.addEventListener("click", () => {
      this.toggleFormDisplay(this.newTaskForm);
    });
    form.appendChild(deleteBtn);

    const submitButton = document.createElement("button");
    submitButton.classList = "addBtn";
    submitButton.type = "submit";
    submitButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>plus-circle</title>
            <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
    `;
    submitButton.style.gridArea = "add"; // Assign to grid area for consistency
    form.appendChild(submitButton);

    const contentDiv = document.getElementById("content");
    contentDiv.appendChild(form);

    form.style.display = "none"; // Initially hide the form
    return form;
  }

  createFormField(placeholderText, type, id, required = false) {
    let input;

    if (id === "description") {
      input = document.createElement("textarea");
      input.rows = 4;
      input.cols = 50;
      input.style.resize = "vertical";
    } else {
      input = document.createElement("input");
      input.type = type;
    }

    input.id = id;
    input.name = id;
    input.placeholder = placeholderText;
    if (required) input.required = true;

    return input;
  }

  showForm(form) {
    form.style.display = "grid";
    this.addToDoBtn.display = "none";
  }

  hideForm(form) {
    form.style.display = "none";
  }

  toggleFormDisplay(form) {
    if (form.style.display === "none" || form.style.display === "") {
      form.style.display = "grid"; // Show the form
      this.addToDoBtn.style.display = "none";
      document.getElementById("title").focus();
    } else {
      form.style.display = "none"; // Hide the form
      this.newTaskForm.reset();
      this.addToDoBtn.style.display = "block";
    }
  }
}
