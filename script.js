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
        runTodos(todos); //Calls runTodos function with todos
    })
}

function runTodos(todos){  //Function that loops through the array and add the todos to the lists.
    todoList.innerHTML = "";
    completedList.innerHTML = "";

    for(let todo of todos){
        
        let create = addTodo(todo); //Creates new variable which calls addTodo with todo as parameter.

        if (todo.completed){
            completedList.prepend(create); //Adds the returned li to the completedlist.
        }
        else{
            todoList.prepend(create); //Using prepend to add it at the top of the list.
        }
    }
}

function addTodo(todo){ //Function that creates elements for the todo and returns li.
    let li = document.createElement("li");
    let input = document.createElement("p");
    let today = document.createElement("p");
    let linebreak = document.createElement("br");
    let completed = document.createElement("input");
    let remove = document.createElement("button");
    let box1 = document.createElement("div");
    let box2 = document.createElement("div");
    
    remove.innerHTML = "Remove";
    completed.type = "checkbox";
    completed.checked = todo.completed;
    input = todo.todo;
    
    remove.setAttribute("id", "remove");
    completed.setAttribute("id", "check");
    today.setAttribute("id", "today");

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (month < 10){
        month = "0" + month;
    }

    if(todo.completed){ //If todo.completed it will add avklarad and the datestamp.
        today = " - Avklarad " + day + "/" + month + "/" + year;
    }
    else{
        today = " - Skapad " + day + "/" + month + "/" + year;
    }
    
    completed.addEventListener("change", (e) =>{ //EventListener to the checkbox.
        todo.completed = e.target.checked;
        runTodos(todos);
    })

    box1.append(completed, input, linebreak, today);
    box2.append(remove);
    li.append(box1, box2);
    return li;
}