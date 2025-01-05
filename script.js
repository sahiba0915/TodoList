document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("taskBtn");
const todoList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => renderTask(task))

addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if(taskText === "") return

    const newTask = {
        id: Date.now(),
        text: taskText,
        isCompleted: false
    }
    tasks.push(newTask);
    saveTasks()
    renderTask(newTask)
    todoInput.value = ""
    console.log(tasks)
})

function renderTask(task) {
    const list = document.createElement('li');
    list.setAttribute('data-id', task.id)
    if(task.isCompleted) list.classList.add('isCompleted')
    list.innerHTML=`
    <span>${task.text}</span>
    <button>Delete</button>
    `;
    list.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return;
        task.isCompleted = !task.isCompleted;
        list.classList.toggle('isCompleted')
        saveTasks()
    })
    list.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        tasks = tasks.filter(t => t.id !== task.id)
        list.remove()
        saveTasks()
    })
    todoList.appendChild(list)
}

function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
})