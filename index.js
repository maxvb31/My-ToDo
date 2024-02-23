const textarea = document.querySelector('textarea')
const addBtn = document.getElementById('add-button')
const todoContainer = document.querySelector('.todo-container')

let todoList = []

function initialLoad() {
    if (!localStorage.getItem('todos')) { 
        return 
    }
    todoList = JSON.parse(localStorage.getItem('todos')).todoList
    updateUI()
}

initialLoad()

function addTodo() {
    const todo = textarea.value
    if (!todo) { return }

    console.log('Added todo: ', todo)
    todoList.push(todo)
    textarea.value = '' // resets to empty
    updateUI()
    saveToLocalStorage()
}

function editTodo(index) {
    textarea.value = todoList[index]
    todoList.splice(index, 1) // Remove the todo from the list
    updateUI()
    saveToLocalStorage()
}

function deleteTodo(index) {
    todoList.splice(index, 1) // Remove the todo from the list
    updateUI()
    saveToLocalStorage()
}

function updateUI() {
    let newInnerHTML = ''

    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
        <div class="todo">
            <p>${todoElement}</p>
            <div class="btn-container">
                <button class="icon-btn" onclick="editTodo(${todoIndex})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="icon-btn" onclick="deleteTodo(${todoIndex})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>`
    })

    todoContainer.innerHTML = newInnerHTML
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify({ todoList }))
}

addBtn.addEventListener('click', addTodo)
