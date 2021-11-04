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
                                <span style="display:none">${todo.id}</span>
                            </div>
                            <i class="fa fa-remove"></i> </li> `
        } else if (todo.isProcessing == true) {
            ulProcess.innerHTML += `<li class="li-process">
                            <div class="processdiv">
                                <input type="checkbox" id="checkbox">
                                <span>${todo.value}</span>
                                <span style="display:none">${todo.id}</span>
                            </div>
                            <i class="fa fa-remove"></i> </li> `
        } else if (todo.isDone == true) {
            ulDone.innerHTML += `<li class="li-done">
            <div class="donediv">
            <span>${todo.value}</span>
            <span style="display:none">${todo.id}</span>
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
let countShow1 = 0;
let countShow2 = 0;
let countShow3 = 0;



let countLocal;

if (localStorage.getItem("countLocal")) {
    countLocal = JSON.parse(localStorage.getItem("countLocal"))
    console.log("çalıştı")
    count1.innerHTML = `${countLocal[0]}/4`;
    count2.innerHTML = `${countLocal[1]} / 4`;
    count3.innerHTML = `${countLocal[2]} / 4`;

    countShow1 = countLocal[0];
    countShow2 = countLocal[1];
    countShow3 = countLocal[2];


} else {
    countLocal = [0, 0, 0]
}





eventListener();

function eventListener() {
    addButton.addEventListener("click", addTodoItem);
    undoneDiv.addEventListener("click", manpUndoneDiv);
    processDiv.addEventListener("click", manpProcessDiv);
    doneDiv.addEventListener("click", manpDoneDiv);
    filter.addEventListener("keyup", filterTodo)
}




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
                            <span style="display:none">${todo.id}</span>
                        </div>
                        <i class="fa fa-remove"></i> </li> `
        alertAddToDo();
        todos.push(todo)
        localStorage.setItem('todos', JSON.stringify(todos))
        console.log(todos);
        countShow1 += 1;
        countLocal[0] += 1;
        localStorage.setItem('countLocal', JSON.stringify(countLocal))
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
        console.log(e.target.id)
        const id = e.target.nextElementSibling.nextElementSibling.innerText;
        console.log(id)
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
                            <span style="display:none">${id}</span>
                        </div>
                        <i class="fa fa-remove"></i> </li> `
            countShow2 += 1;
            countLocal[1] += 1;
            localStorage.setItem('countLocal', JSON.stringify(countLocal))
            countShow1 -= 1;
            countLocal[0] -= 1;
            localStorage.setItem('countLocal', JSON.stringify(countLocal))
            count1.innerText = `${countShow1}/4`;
            count2.innerText = `${countShow2}/4`;
            e.target.parentElement.parentElement.remove()
        } else {
            alert("you can't add processing table")
        };


    } else if (e.target.className == "fa fa-remove") {
        const id = e.target.previousElementSibling.children[2].innerText;
        todos.forEach(((todo, index) => {
            if (todo.id == id) {
                todos.splice(index, 1)
            }
        }))
        localStorage.setItem('todos', JSON.stringify(todos))
        e.target.parentElement.remove()
        countShow1 -= 1
        countLocal[0] -= 1;
        localStorage.setItem('countLocal', JSON.stringify(countLocal))
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
                        <span style="display:none">${id}</span>
                        </div>
                        <i class="fa fa-remove"></i></li>`
            countShow2 -= 1
            countLocal[1] -= 1;
            localStorage.setItem('countLocal', JSON.stringify(countLocal))
            countShow3 += 1
            countLocal[2] += 1;
            localStorage.setItem('countLocal', JSON.stringify(countLocal))
            count2.innerText = `${countShow2}/4`;
            count3.innerText = `${countShow3}/4`;
            e.target.parentElement.parentElement.remove()
        } else {
            alert("you can't add more than done table")
        }

    } else if (e.target.className == "fa fa-remove") {
        if (countShow1 != 4) {
            const id = e.target.previousElementSibling.children[2].innerText;
            console.log(id)
            todos.forEach((todo => {
                if (todo.id == id) {
                    todo.isProcessing = false;
                    todo.isUnDone = true;
                }
            }))
            localStorage.setItem('todos', JSON.stringify(todos))

            ulUndone.innerHTML += `<li class="li-undone">
                            <div class="undonediv">
                                <input type="checkbox" id="checkbox">
                                <span>${e.target.previousElementSibling.innerText}</span>
                                <span style="display:none">${id}</span>
                            </div>
                            <i class="fa fa-remove"></i>    </li>`
            countShow1 += 1
            countLocal[0] += 1;
            localStorage.setItem('countLocal', JSON.stringify(countLocal))
            countShow2 -= 1
            countLocal[1] -= 1;
            localStorage.setItem('countLocal', JSON.stringify(countLocal))
            count1.innerText = `${countShow1}/4`
            count2.innerText = `${countShow2}/4`
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
        countLocal[2] -= 1;
        localStorage.setItem('countLocal', JSON.stringify(countLocal))
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