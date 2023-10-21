// Initialize an empty array to store tasks

var tasks = [];

// Store the index of the task being edited (initially set to -1 for no task)
var editingIndex = -1;

// Function to update the button text based on the editing state
function updateButton() {
    var addButton = document.getElementById("addTaskButton");
    if (editingIndex === -1) {
        addButton.textContent = "Submit";
    } else {
        addButton.textContent = "Update Task";
    }
}

// Function to add a task to the list
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        if (editingIndex === -1) {
            // Add a new task
            tasks.push(taskText);
        } else {
            // Edit an existing task
            tasks[editingIndex] = taskText;
            editingIndex = -1; // Reset editingIndex
        }

        taskInput.value = ""; // Clear the input field
        updateButton(); // Update the button text
        displayTasks();
    }
}

// Function to display tasks in the list
function displayTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the current list

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var listItem = document.createElement("li");
        listItem.textContent = task;

        // Add an Edit button to each task
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("data-index", i); // Store the index of the task
        editButton.addEventListener("click", editTask);

        // Add a Delete button to each task
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", i); // Store the index of the task
        deleteButton.addEventListener("click", deleteTask);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }
}

// Function to edit a task
function editTask(event) {
    var index = event.target.getAttribute("data-index");
    if (index !== null) {
        editingIndex = parseInt(index); // Set editingIndex to the index of the task being edited
        var taskToEdit = tasks[editingIndex];
        var taskInput = document.getElementById("taskInput");
        taskInput.value = taskToEdit; // Populate the input field with the task text
        updateButton(); // Update the button text to "Update Task"
    }
}

// Function to delete a task
function deleteTask(event) {
    var index = event.target.getAttribute("data-index");
    if (index !== null) {
        tasks.splice(index, 1);
        editingIndex = -1; // Reset editingIndex
        updateButton(); // Update the button text to "Add Task"
        displayTasks();
    }
}

// Add a click event listener to the "Add Task" button
var addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click", addTask);

// Initial display of tasks
displayTasks();
let finalList = [];

let display = (finalList) => {
  if (finalList.length === 0) {
    document.getElementById("table").innerHTML = "";
    document.getElementById("infoBox").style.display = "block";
    document.getElementById("infoBox").innerHTML =
      "Currently there are no records !";
  } else {
    let tableItems = "";
    finalList.forEach((EnrollmentTable) => {
      tableItems += "<tr>";
      tableItems += `<td><i>${EnrollmentTable.id}</i></td>`;
      tableItems += `<td class="width-52">${EnrollmentTable.name}</td>`;
      tableItems += `<td><button class="btn btn-primary" onclick="editRecord('${EnrollmentTable.id}' ,'${EnrollmentTable.name}')">Edit <i class="fa fa-edit"></i></button>`;
      tableItems += `&nbsp;<button class="btn btn-danger" onclick="removeRecord('${EnrollmentTable.id}')">Trash <i class="fa fa-trash"></i></button>`;
      tableItems += "</td>";
      tableItems += "</tr>";
      document.getElementById("infoBox").style.display = "none";
      document.getElementById("table").innerHTML = tableItems;
    });
  }
};

// Initial update of the button text
