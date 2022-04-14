let addButton = document.querySelector(".submit");
let inputText = document.querySelector("input");
let clearInput = document.querySelector(".delete-input-img");
let ul = document.querySelector(".list");
let sort = document.querySelector(".sort");
let liArray;

let dragged;

let liContent = '';

let valuesArray = JSON.parse(localStorage.getItem('Array'));
console.log(valuesArray)
if (valuesArray == null) {
    valuesArray = [];
} else {
    liContent = '';
    valuesArray.forEach((item, index) => {
        liContent += `<li draggable='true'><p>${item}</p><img class="delete-list-img" onclick="deleteLi(${index})" src="./img/delete.svg"></li>`;
    });
    ul.style.display = "block";
    ul.innerHTML = liContent;

    setLi();
}

addButton.addEventListener("click", () => {
    valuesArray.push(inputText.value);
    setArray(valuesArray);
    ul.style.display = "block";

    inputText.value = "";
});

function deleteLi(index) {
    valuesArray.splice(index, 1);
    setArray(valuesArray);
}

function setArray(valuesArray) {
    liContent = '';
    valuesArray.forEach((item, index) => {
        liContent += `<li draggable='true'><p>${item}</p><img class="delete-list-img" onclick="deleteLi(${index})" src="./img/delete.svg"></li>`;
    });
    ul.innerHTML = liContent;
    localStorage.setItem('Array', JSON.stringify(valuesArray));

    setLi();
}

function setLi() {
    //bonus
    liArray = document.querySelectorAll('.list li');

    liArray.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.target.style.opacity = 0.5;
            dragged=e.target;
        });
        item.addEventListener('dragend', (e) => {
            e.target.style.opacity = 1;
        });
    });
}

sort.addEventListener('mouseover', (e) => {
    if (e.target.getAttribute("src") == "./img/increase-empty.svg") {
        e.target.setAttribute("src", "./img/increase-filled.svg");
    } else {
        e.target.setAttribute("src", "./img/decrease-filled.svg");
    }
});
sort.addEventListener('mouseout', (e) => {
    if (e.target.getAttribute("src") == "./img/increase-filled.svg") {
        e.target.setAttribute("src", "./img/increase-empty.svg");
    } else {
        e.target.setAttribute("src", "./img/decrease-empty.svg");
    }
});

sort.addEventListener("click", (e) => {
    if (e.target.getAttribute("src") == "./img/increase-filled.svg") {
        console.log(1)
        valuesArray.sort();
        setArray(valuesArray);
        e.target.setAttribute("src", "./img/decrease-filled.svg");
    } else {
        console.log(2)
        valuesArray.sort().reverse();
        setArray(valuesArray);
        e.target.setAttribute("src", "./img/increase-filled.svg");
    }
});
clearInput.addEventListener('click', () => {
    inputText.value = '';
});

// //bonus

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
                if (dragged.getBoundingClientRect().top < liArray[i].getBoundingClientRect().top) {
                    ul.insertBefore(dragged, liArray[i + 1]);
                    liArray = document.querySelectorAll(".list li");
                } else {
                    ul.insertBefore(dragged, liArray[i]);
                    liArray = document.querySelectorAll(".list li");
                }
            }
        }
        else if (e.clientY > liArray[i].getBoundingClientRect().top) {
            ul.append(dragged);
            liArray = document.querySelectorAll(".list li");
        }
    }
    setArray();
});