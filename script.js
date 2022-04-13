let addButton = document.querySelector(".submit");
let inputText = document.querySelector("input");
let clearInput = document.querySelector(".delete-input-img");
let ul = document.querySelector(".list");
let sort = document.querySelector(".sort");
let liArray = [];
let valuesArray = [];
let dragged;
// let text='';

addButton.addEventListener("click", () => {
    valuesArray.push(inputText.value);
    // text+=`<li><p>${inputText.value}</p><img class="delete-list-img" src="/img/delete.svg"></li>`;
    // list.style.display='block';
    // list.innerHTML=text;

    ul.style.display = "block";

    img = document.createElement("img");
    li = document.createElement("li");
    p = document.createElement("p");

    p.innerText = inputText.value;
    img.classList.add("delete-list-img");
    img.src = "/img/delete.svg";
    li.draggable = true;

    li.append(p);
    li.append(img);
    ul.append(li);

    liArray.push(li);

    img.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        liArray = liArray.filter((item) => {
            return item != e.target.parentElement;
        });
    });

    inputText.value = "";

    //bonus
    li.addEventListener('dragstart', (e) => {
        e.target.style.opacity = .5;
        dragged = e.target;
    });
    li.addEventListener('dragend', (e) => {
        e.target.style.opacity = 1;
    });
});

sort.addEventListener("click", (e) => {
    if (e.target.getAttribute("src") == "/img/increase-filled.svg") {
        let stop;
        do {
            stop = true;
            liArray.forEach((item, index, arr) => {
                if (index + 1 != arr.length) {
                    if (
                        item.firstElementChild.innerText >
                        arr[index + 1].firstElementChild.innerText
                    ) {
                        stop = false;
                        changeLi(item.firstElementChild, arr[index + 1].firstElementChild);
                    }
                }
            });
        } while (!stop);
        e.target.setAttribute("src", "/img/decrease-filled.svg");
    } else {
        let stop;
        do {
            stop = true;
            liArray.forEach((item, index, arr) => {
                if (index + 1 != arr.length) {
                    if (
                        item.firstElementChild.innerText <
                        arr[index + 1].firstElementChild.innerText
                    ) {
                        stop = false;
                        changeLi(item.firstElementChild, arr[index + 1].firstElementChild);
                    }
                }
            });
        } while (!stop);
        e.target.setAttribute("src", "/img/increase-filled.svg");
    }
});

sort.addEventListener('mouseover', (e) => {
    if (e.target.getAttribute("src") == "/img/increase-empty.svg") {
        e.target.setAttribute("src", "/img/increase-filled.svg");
    } if (e.target.getAttribute("src") == "/img/decrease-empty.svg") {
        e.target.setAttribute("src", "/img/decrease-filled.svg");
    }
});
sort.addEventListener('mouseout', (e) => {
    if (e.target.getAttribute("src") == "/img/increase-filled.svg") {
        e.target.setAttribute("src", "/img/increase-empty.svg");
    } if (e.target.getAttribute("src") == "/img/decrease-filled.svg") {
        e.target.setAttribute("src", "/img/decrease-empty.svg");
    }
});


function changeLi(a, b) {
    let temp = a.innerText;
    a.innerText = b.innerText;
    b.innerText = temp;
}

clearInput.addEventListener('click', () => {
    inputText.value = '';
});

//bonus

ul.addEventListener('dragover', (e) => {
    e.preventDefault();
});
ul.addEventListener('dragenter', (e) => {
    e.preventDefault();
});

ul.addEventListener('drop', (e) => {
    e.preventDefault();
    for (let i = 0; i < liArray.length; i++) {
        if (i + 1 != liArray.length) {
            if (e.clientY > liArray[i].getBoundingClientRect().top && e.clientY < liArray[i + 1].getBoundingClientRect().top) {
                console.log(e.clientY + "--" + liArray[i].getBoundingClientRect().top + '--' + liArray[i + 1].getBoundingClientRect().top)
                // dragged.remove();
                // dragged.parentNode.removeChild(dragged);
                if (dragged.getBoundingClientRect().top < liArray[i].getBoundingClientRect().top) {
                    ul.insertBefore(dragged, liArray[i + 1]);
                    liArray = document.querySelectorAll(".list li");
                    console.log(1)
                } else {
                    ul.insertBefore(dragged, liArray[i]);
                    liArray = document.querySelectorAll(".list li");
                }
                // liArray.forEach(item => {
                //     console.log(item);
                // });
            }
        }
        else if (e.clientY > liArray[i].getBoundingClientRect().top) {
            ul.append(dragged);
            liArray = document.querySelectorAll(".list li");
        }
    }
});