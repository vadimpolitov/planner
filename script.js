const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");
const taskCount = document.querySelector("#task-count");

let tasks = [];

function updateSummary() {
  const completed = tasks.filter((task) => task.completed).length;
  taskCount.textContent = `Выполнено: ${completed} из ${tasks.length}`;
  emptyMessage.hidden = tasks.length > 0;
}

function renderTasks() {
  list.replaceChildren();

  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = task.completed ? "task done" : "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.id = `task-${index}`;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = task.title;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "Удалить";
    removeButton.setAttribute("aria-label", `Удалить задачу: ${task.title}`);
    removeButton.addEventListener("click", () => {
      tasks = tasks.filter((currentTask) => currentTask !== task);
      renderTasks();
    });

    item.append(checkbox, label, removeButton);
    list.append(item);
  });

  updateSummary();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();

  if (!title) return;

  tasks.push({ title, completed: false });
  input.value = "";
  input.focus();
  renderTasks();
});

renderTasks();
