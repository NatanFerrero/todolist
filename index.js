console.log("Rodando todolist")

const inputTask = document.querySelector("#input-task")
const btnAddTask = document.querySelector("#btn-add-task")
const taskList = document.querySelector("#task-list")

// verifica se valor é nulo no localstorage 
// se "sim", retorna o array vazio 
// se "não", retorna o valor
const getTasks = () => localStorage.getItem("tasks") == null ? [] : JSON.parse(localStorage.getItem("tasks"))

// limpa o valor do input
const clearInput = element => element.value = "" 

// armazena nova task no localstorage
const saveNewTask = name => localStorage.setItem("tasks", JSON.stringify([...getTasks(),{ name, checked: false }]))

const saveListTask = list => localStorage.setItem("tasks", JSON.stringify(list))

// escreve HTML com as tasks disponíveis
const renderTasks = () => {
    tasks = getTasks()
    taskList.innerHTML = tasks.reduce((acc, task, index) => 
    acc+`<li>
        <input type="checkbox" id="task-${index}" ${task.checked && "checked"}>
        <label for="task-${index}">${task.name}</label> 
        <button id="btn-remove-task-${index}">X</button>
    </li>`
    ,"")
}

btnAddTask.addEventListener("click", () => {
    if (inputTask.value){
        saveNewTask(inputTask.value)
        renderTasks()
        clearInput(inputTask)
    }
})

taskList.addEventListener("click", (e) => {
    if (e.target.nodeName == "INPUT") {
        isChecked = e.target.checked
        id = e.target.getAttribute("id").replace("task-","")
        tasks = getTasks()
        tasks[id]={name: tasks[id].name,checked:isChecked}
        saveListTask(tasks)
    }
    if (e.target.nodeName == "BUTTON"){
        id = e.target.getAttribute("id").replace("btn-remove-task-","")
        tasks = getTasks()
        tasks.splice(id,1)
        saveListTask(tasks)
        renderTasks()
    }
})

window.addEventListener("load", () => {
    renderTasks()
})


