const imputForm = document.querySelector(".imputForm");
const inputTask = document.querySelector(".inputTask");
const toDoList = document.querySelector(".toDoList");

toDoList.style.border = "0px";

let tasks = [];
let id = 0;

imputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = inputTask.value.trim();
  
  addObjTask(tasks, text)
  renderTasks(tasks)

  console.log(tasks)
  inputTask.value = "";
})

function addObjTask(arrOftask, textOfTask) {
  const newTask = {};
  newTask.id = ++id;
  newTask.text = textOfTask;

  arrOftask.push(newTask);
  return arrOftask;
}

function renderTasks(tasks) {

  if (tasks.length === 0) {
    toDoList.style.border = "0px";
  } else {
    toDoList.style.border = "1px solid rgb(253, 225, 179)";
  }

  toDoList.innerHTML = "";
  let taskHtml = "";

  tasks.forEach((item) => {
    taskHtml += `  
      <div class="task" data-id ="${item.id}">
        <input type="checkbox">
        <div class="text">${item.text[0].toUpperCase() + item.text.substring(1)}</div>
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
})

