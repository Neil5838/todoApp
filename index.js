const inputElement = document.getElementById("input-element");
const listContainer = document.getElementById("list-container");

const completedSpan = document.getElementById("completed");
const unCompletedSpan = document.getElementById("uncompleted");

window.addEventListener("load", getLocalStorage);

function setLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#list-container li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task").textContent,
      isCompleted: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getLocalStorage() {
  listContainer.innerHTML = "";
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    JSON.parse(storedTasks).forEach((task) => {
      createElementTask(task.text, task.isCompleted);
    });
  }
  taskCounter();
}

function createElementTask(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span>
            <input type="checkbox" ${isCompleted ? "checked" : ""}>
            <span class="task">${taskText}</span>
        </span>
        <span class="action-btns">
            <button class="edit-btn">Edit</button>
            <button class="del-btn">Delete</button>
        </span>
    `;

  if (isCompleted) li.classList.add("completed");

  const checkbox = li.querySelector("input");
  const taskSpan = li.querySelector(".task");
  const editBtn = li.querySelector(".edit-btn");
  const delBtn = li.querySelector(".del-btn");

  checkbox.addEventListener("click", () => {
    li.classList.toggle("completed", checkbox.checked);
    taskCounter();
    setLocalStorage();
  });

  editBtn.addEventListener("click", () => {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      taskCounter();
      setLocalStorage();
    }
  });

  delBtn.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
      li.remove();
      taskCounter();
      showDelSuccessToast();
      setLocalStorage();
    }
  });

  listContainer.appendChild(li);
  inputElement.value = "";
}

function addTask() {
  const inputValue = inputElement.value.trim();
  if (!inputValue) {
    showErrorToast();
    return;
  }
  showSuccessToast();
  createElementTask(inputValue);
  taskCounter();
  setLocalStorage();
}

function taskCounter() {
  const completedTask = listContainer.querySelectorAll(".completed").length;
  const uncompletedTask =
    listContainer.querySelectorAll("li:not(.completed)").length;
  completedSpan.textContent = completedTask;
  unCompletedSpan.textContent = uncompletedTask;
}

function showSuccessToast() {
  Toastify({
    text: "Task added successfully!",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "green",
  }).showToast();
}

function showErrorToast() {
  Toastify({
    text: "Please enter your task!",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "red",
  }).showToast();
}

function showDelSuccessToast() {
  Toastify({
    text: "Task deleted!",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "green",
  }).showToast();
}
