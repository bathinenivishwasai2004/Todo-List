const form = document.querySelector(".addTask");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

function saveTasks() {
    const tasks = [];

    document.querySelectorAll(".taskItem").forEach(function (taskItem) {
        const taskText = taskItem.querySelector(".taskText");

        const checkbox = taskItem.querySelector('input[type="checkbox"]');

        tasks.push({
            text: taskText.textContent,
            completed: checkbox.checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (task) {
        createTask(task.text, task.completed);
    });
}

function createTask(task, completed = false) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");

    const taskText = document.createElement("p");
    taskText.classList.add("taskText");
    taskText.textContent = task;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    if (completed) {
        taskText.classList.add("complete");
    }

    checkbox.addEventListener("change", function () {
        taskText.classList.toggle("complete", checkbox.checked);
        saveTasks();
    });

    // Add your existing Edit button code here.
    const DelTask = document.createElement('button')
    DelTask.classList.add("TaskDone")
    DelTask.textContent = "Delete";
    DelTask.addEventListener("click", function () {
        const confirmDelete = confirm("Are you sure did done this task?");
        if (confirmDelete) {
            taskItem.remove();
            saveTasks();
        }
    })

    // Add your existing Delete button code here.
    const editButton = document.createElement("button")
    editButton.classList.add("editButton")
    editButton.type = "button"
    editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen preview-icon"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`;

    editButton.addEventListener("click", function () {
        const updatedTask = prompt("Enter new task:", taskText.textContent);

        if (updatedTask !== null && updatedTask.trim() !== "") {
            taskText.textContent = updatedTask.trim();
            saveTasks();
        }
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(editButton);
    taskItem.appendChild(DelTask);

    taskList.appendChild(taskItem);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const task = taskInput.value.trim();

    if (task === "") {
        return;
    }

    createTask(task);
    saveTasks();

    taskInput.value = "";
});
loadTasks();