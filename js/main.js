const number = document.getElementById('number');

const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container'); 

const weatherForm = document.getElementById('weather-form');
const weatherInput = document.getElementById('weather-input');
const weatherTemp = document.getElementById('weatherTemp');
const weatherCity = document.getElementById('weatherCity');
const weatherDisc = document.getElementById('weatherDisc');


const weatherApiKey = '38f7e658af37700577c9934397d0ab5d';

/*============number============*/ 
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

/*============todo============*/ 
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

/*============Swiper============*/

let swiper = new Swiper('.mySwiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});


/*============Weather============*/
weatherForm.onsubmit = submitHandler;

async function submitHandler(e) {
    e.preventDefault();

    if (!weatherInput.value) {
        alert('Enter city Name plz');
        return
    }

    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    const cityInfo = await getGeo(weatherInput.value);


    const weatherInfo = await getWeather(cityInfo[0]['lat'],cityInfo[0]['lon']);

    weatherTemp.innerText = weatherInfo.main.temp;
    weatherCity.innerText = weatherInfo.name;
    if (weatherInfo.main.temp < -30) {
        weatherDisc.innerText = 'Cold'

    } else if (weatherInfo.main.temp < -0) {
        weatherDisc.innerText = 'neutral'
    }   else if (weatherInfo.main.temp > 20) {
        weatherDisc.innerText = 'hot'
    }

}

async function getGeo(name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${weatherApiKey}`;
    const responce = await fetch(geoUrl);
    const weatherData = await responce.json();
    return weatherData;
}

async function getWeather(lat,lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    const responce = await fetch(weatherUrl);
    const weatherData = await responce.json();
    return weatherData;

}



showList();

