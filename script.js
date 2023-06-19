const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");
const todoForm = document.getElementById("todo-form");
let todos = []; //Array that will contain the todos
let idPosition = 6;

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
    
    remove.innerHTML = "Delete";
    completed.type = "checkbox";
    completed.checked = todo.completed;
    input = todo.todo;
    
    remove.setAttribute("id", "remove");
    completed.setAttribute("id", "check");

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
    
    remove.addEventListener("click", () => { //EventListener to the delete button.
        deleteTodo(todo, todos, () => {
            runTodos(todos);
        });
      });

    completed.addEventListener("change", (e) =>{ //EventListener to the checkbox.
        todo.completed = e.target.checked;
        runTodos(todos);
    })

    box1.append(completed, input, linebreak, today);
    box2.append(remove);
    li.append(box1, box2);
    return li;
}

function deleteTodo(todo, todos, after) { //Function for deleting todos.
    fetch("https://dummyjson.com/todos/" + todo.id, { 
        method: "DELETE", //This fetch will return the deleted todo with deletedOn.
    })
    .then(res => res.json())
    .then(data => {
        if (data.deletedOn) { 
            let index = todos.findIndex((todo) => todo.id === data.id); // Finds the array index of the todo.
            todos.splice(index, 1); // Removes 1 element in the array. Index decide which element(position) that should be removed.
            after();
        }
    });
}

todoForm.addEventListener("submit", (event) => { // Eventlistener to the submit button.
    event.preventDefault();
  
    let input = todoForm.children[0]; // Input will be the value of the input field from the form, which is children[0].
  
    newTodo(input.value, todos, () => { 
        runTodos(todos);
    });
    input.value = ""; //Clears the input field each time a new todo has been created.
})

function newTodo(input, todos, after) { //Fetch add from dummy json.
    fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            todo: input, //Todo will be input which is the value from the input field.
            completed: false, //New todos will be false.
            userId: 5, //Not used. Can set this to any value.
      }),
    })
    .then(res => res.json())
    .then(data => {
        data.id = idPosition++; //The id will get the value of idPosition and then increase with 1 each time a new todo is added. Starts at 6 cause we're only fetching 5 todos.
        todos.push(data); //Push the new todo into the array.
        after();
    });
}