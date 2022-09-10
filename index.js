console.log("Rodando todolist")

const inputTask = document.querySelector("#input-task")
const btnAddTask = document.querySelector("#btn-add-task")

// verifica se valor é nulo no localstorage 
// se "sim", retorna o array vazio 
// se "não", retorna o valor
const getTasks = () => localStorage.getItem("tasks") == null ? [] : JSON.parse(localStorage.getItem("tasks"))

// limpa o valor do input
const clearInput = element => element.value = "" 

// armazena nova task no localstorage
const saveNewTask = name => localStorage.setItem("tasks", JSON.stringify([...getTasks(),{ name, checked: false }]))

// escreve HTML com as tasks disponíveis
const renderTasks = () => {
    taskList = document.querySelector("#task-list")
    tasks = getTasks()
    taskList.innerHTML = tasks.reduce((acc, task, index) => 
    acc+`<li>
        <input type="checkbox" id="${index}">
        <label for="${index}">${task.name}</label> 
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

window.addEventListener("load", () => {
    renderTasks()
})
