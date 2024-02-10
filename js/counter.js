/*counter*/ 
const number = document.getElementById('number');
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
