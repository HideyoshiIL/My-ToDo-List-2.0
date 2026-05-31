const imputForm = document.querySelector(".imputForm");
const inputTask = document.querySelector(".inputTask");
const toDoList = document.querySelector(".toDoList");
const filterBtn = document.querySelector(".filter");


let tasks = [];

let completed = false;

const localSaved = localStorage.getItem("Tasks")
tasks = localSaved ? JSON.parse(localSaved) : [];
renderTasks(tasks)
let id = tasks.length ? Math.max(...tasks.map(t => t.id)) : 0;

imputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = inputTask.value.trim();

  addObjTask(tasks, text)
  renderTasks(tasks)
  saveInLocalStorage(tasks)

  inputTask.value = "";
})

function addObjTask(arrOftask, textOfTask) {
  const newTask = {};
  newTask.id = ++id;
  newTask.text = textOfTask;
  newTask.completed = completed;

  arrOftask.push(newTask);
  return arrOftask;
}
saveInLocalStorage(tasks)

function renderTasks(tasks) {

  if (tasks.length === 0) {
    toDoList.classList.remove("activeList");
  } else {
    toDoList.classList.add("activeList");
  }

  toDoList.innerHTML = "";
  let taskHtml = "";

  tasks.forEach((item) => {
    taskHtml += `  
      <div class="task ${item.completed ? "completed" : ''}" data-id ="${item.id}">
      <i class="fa fa-check-square-o checkBox" aria-hidden="true"></i>
        <div class="text ${item.completed ? "textDecor" : ''}">${item.text[0].toUpperCase() + item.text.substring(1)}</div>
  <i class="fa fa-trash-o" aria-hidden="true"></i>
    </div>`
  })

  toDoList.innerHTML = taskHtml;
}

toDoList.addEventListener("click", (e) => {

  if (e.target.classList.contains("fa-trash-o")) {
    const taskTarget = e.target.closest(".task");
    if (taskTarget) {
      const dataId = Number(taskTarget.dataset.id)
      tasks = tasks.filter(item => item.id !== dataId);
      renderTasks(tasks)
      saveInLocalStorage(tasks)
    }
  }

  if (e.target.classList.contains("checkBox")) {

    const taskTarget = e.target.closest(".task");
    if (taskTarget) {
      const dataId = Number(taskTarget.dataset.id);

      const task = tasks.find(item => item.id === dataId);
      task.completed = !task.completed
      renderTasks(tasks)
      saveInLocalStorage(tasks)
    }

  }
})

filterBtn.addEventListener("click", () => {
  tasks.sort((a, b) => a.completed - b.completed)
  renderTasks(tasks)
  saveInLocalStorage(tasks)
})

function saveInLocalStorage(tasks) {
  const saveLocStor = JSON.stringify(tasks);
  localStorage.setItem("Tasks", saveLocStor);
}