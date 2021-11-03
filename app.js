const addTodo = document.querySelector("#addItem");
const addButton = addTodo.nextElementSibling;
const ulUndone = document.querySelector("#ul-undone");
const ulProcess = document.querySelector("#ul-process");
const ulDone = document.querySelector("#done")
const undoneDiv = document.querySelector(".undone");
const processDiv = document.querySelector(".process");
const doneDiv = document.querySelector(".done");
const alertContainer = document.querySelector("#alert-container");
const filter = document.querySelector("#filter");
const count1 = document.querySelector("#count1");
const count2 = document.querySelector("#count2");
const count3 = document.querySelector("#count3");
// let todos = [{
//     id: 1,
//     value: "todo1",
//     isUndone: true,
//     isProcessing: false,
//     isDone: false
// },
// {
//     id: 2,
//     value: "todo2",
//     isUndone: false,
//     isProcessing: true,
//     isDone: false
// },
// {
//     id: 3,
//     value: "todo3",
//     isUndone: false,
//     isProcessing: false,
//     isDone: true
// }
// ]
let todos;
if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach(todo => {
        if (todo.isUndone == true) {
            ulUndone.innerHTML += ` <li class="li-undone">
                            <div class="undonediv">
                                <input type="checkbox" id="checkbox">
                                <span>${todo.value}</span>
                                <span>${todo.id}</span>
                            </div>
                            <i class="fa fa-remove"></i> </li> `
        } else if (todo.isProcessing == true) {
            ulProcess.innerHTML += `<li class="li-process">
                            <div class="processdiv">
                                <input type="checkbox" id="checkbox">
                                <span>${todo.value}</span> 
                                <span>${todo.id}</span> 
                            </div>
                            <i class="fa fa-remove"></i> </li> `
        } else if (todo.isDone == true) {
            ulDone.innerHTML += `<li class="li-done">
            <div class="donediv">
            <span>${todo.value}</span>
            <span>${todo.id}</span>
            </div>
            <i class="fa fa-remove"></i></li>`
        }
    })
} else {
    todos = []
}

// let todos;
// // if (localStorage.getItem('todos')) {
// //     todos = JSON.parse(localStorage.getItem('todos'));

// // }




eventListener();

function eventListener() {
    addButton.addEventListener("click", addTodoItem);
    undoneDiv.addEventListener("click", manpUndoneDiv);
    processDiv.addEventListener("click", manpProcessDiv);
    doneDiv.addEventListener("click", manpDoneDiv);
    filter.addEventListener("keyup", filterTodo)
}

let countShow1 = 0;
let countShow2 = 0;
let countShow3 = 0;


function addTodoItem() {
    let value = addTodo.value.toLowerCase().trim();
    let id = createId()
    const todo = createTodo(id, value, true, false, false)
    if (countShow1 == 4) {
        alert("you can't add than more")
    } else if (value !== "") {

        ulUndone.innerHTML += ` <li class="li-undone">
                        <div class="undonediv">
                            <input type="checkbox" id="checkbox">
                            <span>${todo.value}</span>
                            <span>${todo.id}</span>
                        </div>
                        <i class="fa fa-remove"></i> </li> `
        alertAddToDo();
        todos.push(todo)
        localStorage.setItem('todos', JSON.stringify(todos))
        console.log(todos);
        countShow1 += 1;
        count1.innerText = `${countShow1}/4`
        console.log(countShow1)
        addTodo.value = "";
    } else {
        alert("Please Enter a To-Do")
    }

}

console.log(countShow1)



function manpUndoneDiv(e) {
    if (e.target.id == "checkbox") {
        const id = e.target.nextElementSibling.nextElementSibling.innerText;

        todos.forEach((todo => {
            if (todo.id == id) {
                todo.isUndone = false;
                todo.isProcessing = true;
            }
        }))

        localStorage.setItem('todos', JSON.stringify(todos));



        if (countShow2 != 4) {
            ulProcess.innerHTML += `<li class="li-process">
                        <div class="processdiv">
                            <input type="checkbox" id="checkbox">
                            <span>${e.target.nextElementSibling.innerText}</span>
                            <span>${id}</span>
                        </div>
                        <i class="fa fa-remove"></i> </li> `
            countShow2 += 1;
            countShow1 -= 1;
            count1.innerText = `${countShow1}/4`;
            count2.innerText = `${countShow2}/4`;
            e.target.parentElement.parentElement.remove()
        } else {
            alert("you can't add processing table")
        };


    } else if (e.target.className == "fa fa-remove") {

        e.target.parentElement.remove()
        countShow1 -= 1
        count1.innerText = `${countShow1}/4`;
        alertDeleteToDo()
    }


}


function manpProcessDiv(e) {
    if (e.target.id == "checkbox") {
        if (countShow3 != 4) {
            console.log(e.target.nextElementSibling.nextElementSibling.innerText);
            const id = e.target.nextElementSibling.nextElementSibling.innerText;
            todos.forEach((todo => {
                if (todo.id == id) {
                    todo.isProcessing = false;
                    todo.isDone = true;
                }
            }))
            localStorage.setItem('todos', JSON.stringify(todos))
            ulDone.innerHTML += `<li class="li-done">
                        <div class="donediv">
                        <span>${e.target.nextElementSibling.innerText}</span>
                        <span>${id}</span>
                        </div>
                        <i class="fa fa-remove"></i></li>`
            countShow2 -= 1
            countShow3 += 1
            count2.innerText = `${countShow2}/4`;
            count3.innerText = `${countShow3}/4`;
            e.target.parentElement.parentElement.remove()
        } else {
            alert("you can't add more than done table")
        }

    } else if (e.target.className == "fa fa-remove") {
        console.log("tessssss");
        if (countShow1 != 4) {

            ulUndone.innerHTML += `<li class="li-undone">
                            <div class="undonediv">
                                <input type="checkbox" id="checkbox">
                                <span>${e.target.previousElementSibling.children[1].innerText}</span>
                                <span>${id}</span>
                            </div>
                            <i class="fa fa-remove"></i>    </li>`
            countShow1 += 1
            countShow2 -= 1
            count1.innerText = `${countShow1}/4`
            count2.innerText = `${countShow2}/4`
            console.log("test");
            e.target.parentElement.remove()
        } else {
            alert("you can't remove to-do in processing because Undone table is full")
        }

    }



}

function manpDoneDiv(e) {
    if (e.target.className == "fa fa-remove") {

        const id = e.target.previousElementSibling.children[1].innerText;
        todos.forEach(((todo, index) => {
            if (todo.id == id) {
                todos.splice(index, 1)
            }
        }))
        localStorage.setItem('todos', JSON.stringify(todos))
        e.target.parentElement.remove()
        countShow3 -= 1
        count3.innerText = `${countShow3}/4`
        alertDeleteToDo()
    }


}


function alertAddToDo() {

    alertContainer.innerHTML = `<p class="alert"> Başarıyla Eklendi </p> `;

    setTimeout(function () {
        alertContainer.innerHTML = ``;

    }, 1000)
}

function alertDeleteToDo() {

    alertContainer.innerHTML = `<p class="alert-delete"> Başarıyla Silindi .. </p> `;

    setTimeout(function () {
        alertContainer.innerHTML = ``;

    }, 1000)
}

function filterTodo() {
    let value = filter.value.toLowerCase().trim();

    [...ulUndone.children].forEach(function (listItem) {

        if (listItem.firstElementChild.lastElementChild.innerText.includes(value)) {
            listItem.style.display = "flex";
        } else {
            listItem.style.display = "none";
        }
    });

    [...ulProcess.children].forEach(function (listItem) {
        if (listItem.firstElementChild.lastElementChild.innerText.includes(value)) {
            listItem.style.display = "flex";
        } else {
            listItem.style.display = "none";
        }
    });

    [...done.children].forEach(function (listItem) {
        if (listItem.firstElementChild.lastElementChild.innerText.includes(value)) {
            listItem.style.display = "flex";
        } else {
            listItem.style.display = "none";
        }
    })


}
// id: 1,
//     value: "todo1",
//         isUndone: true,
//             isProcessing: false,
//                 isDone: false

function createTodo(id, value, isUndone, isProcessing, isDone) {
    return {
        id,
        value,
        isUndone,
        isProcessing,
        isDone
    }
}
function createId() {
    return Date.now();
}