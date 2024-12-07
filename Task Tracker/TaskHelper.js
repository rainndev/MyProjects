class TaskHelper {
  constructor() {
    this.ulElement = document.querySelector(".output-container");
    this.inputElement = document.querySelector(".add-task-inp");
    this.addTaskElement = document.querySelector(".task");
    this.modal = document.querySelector(".parent-modal");
    this.titleModalElement = document.querySelector(".title-modal");
    this.dateModalElement = document.querySelector(".date-modal");
    this.dataExample = [];
  }

  addTask() {
    if (
      this.inputElement.value.trim() !== "" &&
      this.inputElement.value.trim() != null &&
      this.inputElement.value.length >= 3
    ) {
      this.dataExample.unshift({
        taskName: this.inputElement.value,
        isDone: false,
        createdAt: this.formatDate(),
      });

      this.renderList();
    }
  }

  renderList() {
    if (this.isDataIsNull()) {
      //Show this if dataExample is empty
      this.noTaskShow();
      return;
    }

    //Iterate all data and store it in liOutputHTML
    let i = 0;
    let liOutputHTML = "<ul class='output-list'>  ";
    for (let data of this.dataExample) {
      i++;
      liOutputHTML += `
       <div class="task-output-container ${data.isDone ? "isDoneClass" : ""}" >
                  <li class="li-output-container" data-task-output-container="${i}">
                        ${this.trimTitle(data.taskName, 15)}
                        <p class="date-txt">${data.createdAt}</p> 
                  </li>
                    ${
                      data.isDone
                        ? `<p class="mark-completed" data-mark="${i}" style="color: #39b392" >Completed</p>`
                        : `<p class="mark-completed" data-mark="${i}" style="color: #f18484" >Not Completed</p>`
                    }

                  <div class="delete-img" data-index-delete="${i}"">
                        <img src="${
                          data.isDone
                            ? "/img/delete-completed.png"
                            : "/img/delete-not-completed.png"
                        }" width="20px" height="20px" />
                  </div>
       </div>
      `;
    }

    this.ulElement.innerHTML = liOutputHTML + " </ul>";
    this.inputElement.value = "";

    //add here the markAscomplete and Delete
    this.markAsComplete();
    this.deleteTask();
    this.showModal();
  }

  markAsComplete() {
    document.querySelectorAll(".mark-completed").forEach((element) => {
      element.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-mark") - 1;
        console.log("Mark " + index);

        if (!this.dataExample[index].isDone) {
          this.dataExample[index].isDone = true;
          // Re-render the list to update the UI
          this.renderList();
          // Save data to localStorage
          localStorage.setItem("data-task", JSON.stringify(this.dataExample));
        }
      });
    });
  }

  formatDate() {
    const date = new Date();

    // Get hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Format minutes to always have two digits
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Determine AM or PM
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert 24-hour time to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, change it to 12

    // Get day, month, and year
    const day = date.getDate();
    const year = date.getFullYear();

    // Array of month names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthName = months[date.getMonth()];

    // Combine all parts into the desired format
    return `${monthName} ${day} ${year} | ${hours}:${minutes} ${ampm}`;
  }

  deleteTask() {
    document.querySelectorAll(".delete-img").forEach((element) => {
      element.addEventListener("click", (event) => {
        const index = element.getAttribute("data-index-delete") - 1;
        console.log("data-delete: " + index);
        //delete data from dataExample and render
        this.dataExample.splice(index, 1);
        // Re-render the list to update the UI
        this.renderList();
      });
    });

    // Save data to localStorage
    localStorage.setItem("data-task", JSON.stringify(this.dataExample));
  }

  showModal() {
    document.querySelectorAll(".li-output-container").forEach((element) => {
      element.addEventListener("click", (event) => {
        const index = element.getAttribute("data-task-output-container") - 1;
        //get title and bind it in titleModalElement
        this.titleModalElement.innerText = this.dataExample[index].taskName;
        //get date and bind it in dateModalElement
        this.dateModalElement.innerText = `Created at ${this.dataExample[index].createdAt}`;
        //show the modal
        this.modal.classList.add("show");
      });
    });
  }

  noTaskShow() {
    //Show this if dataExample is empty
    this.ulElement.innerHTML = `
             <div class="no-data">
              <h1>No Tasks Yet</h1>
              <p>You don't have any tasks right now.</p>
            </div>`;

    //add here the markAscomplete() and deleteTask()
    this.markAsComplete();
    this.deleteTask();
  }

  isDataIsNull() {
    return this.dataExample.length === 0 || this.dataExample == null;
  }

  trimTitle(_text, _count) {
    return _text.slice(0, _count) + (_text.length > _count ? "..." : "");
  }
}
