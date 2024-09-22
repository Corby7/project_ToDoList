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

      const completed = document.createElement("input");
      completed.type = "checkbox";
      completed.checked = task.completed;
      completed.addEventListener("change", () => {
        this.onTaskComplete(index);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "deleteToDo";
      deleteBtn.innerText = "x";
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

    // Add ToDo button
    const listItem = document.createElement("li");
    const addBtn = document.createElement("button");
    addBtn.id = "addToDo";
    addBtn.innerText = "+";
    addBtn.addEventListener("click", () => this.showForm(this.newTaskForm));
    listItem.appendChild(addBtn);
    this.displayList.appendChild(listItem);
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
    this.showForm(this.newTaskForm);
  }

  createTaskForm() {
    const form = document.createElement("form");
    form.id = "newTaskForm";

    form.appendChild(this.createFormField("Title:", "text", "title", true));
    form.appendChild(
      this.createFormField("Description:", "text", "description")
    );
    form.appendChild(
      this.createFormField("Due Date:", "datetime-local", "dueDate")
    );
    form.appendChild(this.createFormField("Priority:", "text", "priority"));

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerText = "+ New ToDo";
    form.appendChild(submitButton);

    document.body.appendChild(form);
    form.style.display = "none"; // Initially hide the form
    return form;
  }

  createFormField(labelText, type, id, required = false) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
    if (required) input.required = true;

    const fieldContainer = document.createElement("div");
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);

    return fieldContainer;
  }

  showForm(form) {
    form.style.display = "block";
  }

  hideForm(form) {
    form.style.display = "none";
  }

  toggleFormDisplay(form) {
    if (form.style.display === "none" || form.style.display === "") {
      form.style.display = "block"; // Show the form
    } else {
      form.style.display = "none"; // Hide the form
    }
  }
}
