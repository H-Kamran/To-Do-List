let space=' ';
space+=`
<li><p>ackn</p>
<button>x</button>
</li>`

let addButton=document.querySelector('.submit');
let inputText=document.querySelector('input');
let list=document.querySelector('.list');
// let deleteItem=document.querySelectorAll('.delete-list-img');
let deleteItemImages=[];
let array=[];
let text='';
let i=0;

addButton.addEventListener('click',()=>{
    array.push(inputText.value);
    // text+=`<li><p>${inputText.value}</p><img class="delete-list-img" src="/img/delete.svg"></li>`;
    // list.style.display='block';
    // list.innerHTML=text;

    list.style.display='block';

    img=document.createElement('img');
    li=document.createElement('li');
    p=document.createElement('p');

    p.innerText=inputText.value;
    img.classList.add("delete-list-img");
    img.src="/img/delete.svg";

    li.append(p);
    li.append(img);
    list.append(li);

    i++;

    deleteItemImages.push(img);

    img.addEventListener('click',(e)=>{
        deleteItemImages.forEach(item=>{
            console.log(e.target==item);
            e.target.parentElement.remove();
        });
    });

    // img.addEventListener('click',deleteItem);

    // // for(let j=0;j<deleteItemImages.length;j++){
    // //     deleteItemImages[j].removeEventListener('click',deleteItem);
    // //     deleteItemImages[j].addEventListener('click',deleteItem);
    // // }
    // function deleteItem(e){
    //     console.log(e.target);
    //     e.target.removeEventListener('click',deleteItem);
    // }
});

// deleteItem.forEach(element => {
//     element.addEventListener('click',(item)=>{
//         console.log(1)
//         alert(index);
//     });
// });

// deleteItemImages.forEach((item)=>{
//     item.addEventListener('click',(item)=>{
//         console.log(1);
//     });
// });
