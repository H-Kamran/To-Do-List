let space=' ';
space+=`
<li><p>ackn</p>
<button>x</button>
</li>`

let addButton=document.querySelector('.submit');
let inputText=document.querySelector('input');
let list=document.querySelector('.list');
let array=[];
let text;

addButton.addEventListener('click',()=>{
    text+=`<li><p>${inputText.value}</p><button>x</button></li>`;
    list.innerHTML=text;
});