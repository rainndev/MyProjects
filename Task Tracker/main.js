const task = new TaskHelper();
const addTaskId = document.querySelector(".task");

//Push data object using clicking addTask button
addTaskId.addEventListener("click", function () {
  task.addTask();
});

//Check if data-task have data
if (JSON.parse(localStorage.getItem("data-task") !== null)) {
  task.dataExample = JSON.parse(localStorage.getItem("data-task"));
  task.renderList();
} else {
  task.dataExample = [];
}

//Push data object using "Enter" in keyboard
task.inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    task.addTask();
  }
});

//Modal close button
document
  .querySelector(".close-button")
  .addEventListener("click", function (event) {
    task.modal.classList.remove("show");
  });

if (task.isDataIsNull()) {
  //Show this if dataExample is empty
  task.noTaskShow();
}
