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
    if (countShow1 == 4) {
        alert("you can't add than more")
    } else if (value !== "") {
        ulUndone.innerHTML += ` <li class="li-undone">
                        <div class="undonediv">
                            <input type="checkbox" id="checkbox">
                            <span>${value}</span>
                        </div>
                        <i class="fa fa-remove"></i> </li> `
        alertAddToDo();
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

        if (countShow2 != 4) {
            ulProcess.innerHTML += `<li class="li-process">
                        <div class="processdiv">
                            <input type="checkbox" id="checkbox">
                            <span>${e.target.nextElementSibling.innerText}</span> 
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
            ulDone.innerHTML += `<li class="li-done">
                        <div class="donediv">
                        <span>${e.target.nextElementSibling.innerText}</span>
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
        if (countShow1 != 4) {
            ulUndone.innerHTML += `<li class="li-undone">
                            <div class="undonediv">
                                <input type="checkbox" id="checkbox">
                                <span>${e.target.previousElementSibling.children[1].innerText}</span>
                            </div>
                            <i class="fa fa-remove"></i>    </li>`
            countShow1 += 1
            countShow2 -= 1
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