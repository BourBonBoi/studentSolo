
const number = document.getElementById('number');
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container'); 

/*number*/ 
let changeNum = Number(number.textContent)

function minusNumber() {
    changeNum -=1;
    number.textContent = changeNum;
    saveData() 
}

function addNumber() {
    changeNum +=1;
    number.textContent = changeNum;
    saveData() 
}

/*todo*/ 
function addTask() {
    if (inputBox.value === '') {
        alert('Please add new task');
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = 'X';
        li.appendChild(span);
    }
    
    inputBox.value = '';
    saveData()
}

listContainer.addEventListener('click', function(e){
    if (e.target.tagName ==='LI') {
        e.target.classList.toggle("checked");
        saveData()
    }
    else if (e.target.tagName ==='SPAN'){
        e.target.parentElement.remove();
        saveData()
    }
},false);


function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}
function showList() {
    listContainer.innerHTML = localStorage.getItem('data');
}

/*Swiper*/

let swiper = new Swiper('.mySwiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});






showList();

