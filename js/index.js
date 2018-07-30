//component/DOM variable
const inputTask = $("#add-task");
const add = $("#button-add");
const taskShow = $("#show-task");

const getIncrement = () => {
  const increment = Number(localStorage.getItem("increment"));
  if (increment) return increment;
  else return 0;
};

const setIncrement = () => {
  const currentIncrement = getIncrement();
  localStorage.setItem("increment", currentIncrement + 1);
};

const getLocalstorage = key => {
  const data = window.localStorage.getItem(key);

  if (data) return JSON.parse(data);
  else return [];
};

//initial array
let taskList = getLocalstorage();

const setLocalstorage = (key, array) => {
  localStorage.setItem(key, JSON.stringify(array));
};

const addTask = () => {
  setIncrement();

  const task = {
    id: getIncrement(),
    taskName: $("#add-task").val()
  };

  taskList.push(task);
  setLocalstorage("task", taskList);
};

//template display data to html
const displayTemplate = (task, index) => {
  return `
  <div id="task-row-${task.id}" class="row">
    <div class="col-sm-11">${task.taskName}</div>
    <div class="col-sm-1">
    <input id="button-tick-${task.id}"class="button tick" type="button">
    </div>
  </div>
  `;
};

const showTask = () => {
  const taskList = getLocalstorage("task");
  taskShow.html("");

  taskList.forEach((task, index) => {
    const tasks = displayTemplate(task, index);
    taskShow.append(tasks);
  });

  // taskList.forEach(task => {
  //   $(`#button-tick-${task.id}`).on("click", function() {
  //     taskCompleted(task.id);
  //   });
  // });
};

// const taskCompleted = idtoRemove => {
//   $(`#task-row-${idtoRemove}`).remove();
//   const taskList = getLocalstorage("task");

//   taskList.find((task, index) => {
//     if (task.id == idtoRemove) {
//       taskList.splice(index, 1);
//     }
//   });
// };

//eventlistener
window.addEventListener("load", function() {
  add.on("click", function() {
    addTask();
    showTask();
  });
});
