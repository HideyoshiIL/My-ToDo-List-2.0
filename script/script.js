const imputForm = document.querySelector(".imputForm");
const inputTask = document.querySelector(".inputTask");
const toDoList = document.querySelector(".toDoList");
const filterBtn = document.querySelector(".filter");


let tasks = [];
let id = 0;
let completed = false;

imputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = inputTask.value.trim();

  addObjTask(tasks, text)
  renderTasks(tasks)


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
    }
  }

  if (e.target.classList.contains("checkBox")) {

    const taskTarget = e.target.closest(".task");
    if (taskTarget) {
      const dataId = Number(taskTarget.dataset.id);

      const task = tasks.find(item => item.id === dataId);
      task.completed = !task.completed
    renderTasks(tasks)
    }

  }
})

filterBtn.addEventListener("click", () => {
  tasks.sort((a,b) => a.completed - b.completed)
  renderTasks(tasks)
})