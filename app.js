document.getElementById("date").innerHTML = new Date().toDateString()
let Work = document.getElementById("list");
let add = document.getElementById("task");
let clear = document.querySelector(".clear")
let list = []; let id = 0;
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
let data = localStorage.getItem("TODO");


if (data) {
    list = JSON.parse(data);
    id = list.length;
    loadList(list);
} else {

    list = [];
    id = 0;
}


function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});



document.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        if (add.value) {
            addToDo(add.value, id, false, false)
            list.push(
                {
                    name: add.value,
                    id: id,
                    done: false,
                    trash: false
                }
            )
            id++;
            localStorage.setItem("TODO", JSON.stringify(list));
        }
        add.value = "";

    }
})
function addToDo(toDO, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const List = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDO}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

    const position = "beforeend";
    let htmlObject = document.createElement("div")
    htmlObject = List;
    Work.insertAdjacentHTML(position, htmlObject);
}
function completeToDo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK);
   // console.log(element.parentNode)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    list[element.id].done = list[element.id].done ? false : true;
}
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    list[element.id].trash = true;
}
Work.addEventListener("click", function (event) {
    // console.log(event.target)
    const element = event.target;
    const elementJob = element.attributes.job.value;
    console.log(element.parentNode)

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }


    localStorage.setItem("TODO", JSON.stringify(list));
});