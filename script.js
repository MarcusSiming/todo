const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");
let todos = []; //Array that will contain the todos

start();

function start(){ //Fetch 5 premade todos from dummyjson
    fetch("https://dummyjson.com/todos?limit=5")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        todos = data.todos; //Save todos in the array
        
    })
}

