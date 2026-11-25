// Get HTML Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display Tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        // Create List Item
        const li = document.createElement("li");

        // Create Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // Mark task as completed
        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Create Task Text
        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        // Create Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        // Delete Task
        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        // Add elements to List Item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Add List Item to Task List
        taskList.appendChild(li);
    });
}

// Add New Task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Add task to array
    tasks.push({
        text: taskText,
        completed: false
    });

    // Save and display tasks
    saveTasks();
    displayTasks();

    // Clear input box
    taskInput.value = "";
}

// Add Button Event
addBtn.addEventListener("click", addTask);

// Add task using Enter key
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Display saved tasks when page loads
displayTasks();