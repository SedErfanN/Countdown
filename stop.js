/*let hr = min = sec = ms = "0" + 0, 
startTimer;

const startBtn = document.querySelector('.start'),
stopBtn = document.querySelector('.stop'),
resetBtn = document.querySelector('.reset');



startBtn.addEventListener('click', startTime);
stopBtn.addEventListener('click', stopTime);
resetBtn.addEventListener('click', resetTime);


function startTime(){
    startBtn.classList.add("active");
    startBtn.classList.remove("stopActive");
    stopBtn.classList.remove("stopActive");

    startTimer = setInterval(()=>{
        ms++
        ms = ms < 10 ? "0" + ms : ms;

        if(ms == 100){
            sec++;
            sec = sec < 10 ? "0" + sec : sec;

            ms = "0" + 0;
        }
        if(sec == 60){
            min++;
            min = min < 10 ? "0" + min : min;

            sec = "0" + 0;
        }
        if(min == 60){
            hr++;
            hr = hr < 10 ? "0" + hr : hr;
            hr = "0" + 0;
        }

        putValue();
    },10); //1000ms = 1s
}

function stopTime(){
    startBtn.classList.remove("active");
    stopBtn.classList.add("stopActive");
    clearInterval(startTimer);
}

function resetTime(){
    startBtn.classList.remove("active");
    stopBtn.classList.remove("stopActive");
    clearInterval(startTimer);
    hr = min = sec = ms = "0" + 0;
    putValue();
}

function putValue(){
    document.querySelector('.milisecond').innerHTML = ms;
    document.querySelector('.second').innerHTML = sec;
    document.querySelector('.minute').innerHTML = min;
    document.querySelector('.hour').innerHTML= hr;

}*/



let span = document.querySelectorAll("span");
let hour = document.querySelector('.hour');
let minute = document.querySelector('.minute');
let second = document.querySelector('.second');
let start = document.querySelector('.start');
let stopBtn = document.querySelector('.stop');
let reset = document.querySelector('.reset');
let input = document.querySelector('input');

/////////////////// Validating ///////////////////

function validating(){
    if(Number(input.value) > 60){
        hour.innerHTML = Math.floor(Number(input.value) / 60);
        leadingZero(hour);
        minute.innerHTML = Number(input.value)%60;
        leadingZero(minute);
    }else if(Number(input.value) < 1 && Number(input.value) != 0){
        second.innerHTML = (Number(input.value) % 60).toString().slice(0, 2);
        leadingZero(second);
    }else if(Number(input.value) > 1 && Number(input.value) < 60){
        minute.innerHTML = Math.floor(Number(input.value));
        leadingZero(minute);
    }
}

/////////////////  Countdown //////////////////

function counter(){
    if(hour.innerHTML >= 0 && minute.innerHTML >= 0 && second.innerHTML != 0)
    second.innerHTML-- ;
    if(minute.innerHTML > 0 && second.innerHTML == 0){
        minute.innerHTML--;
        second.innerHTML = 59;
    }
    if(hour.innerHTML>0 && minute.innerHTML == 0){
        hour.innerHTML--;
        minute.innerHTML = 59;
    }
    leadingZero(second);
    leadingZero(minute);
    leadingZero(hour);

}

/////////////// leadingZero //////////////
function leadingZero(varName){
    if(varName.innerHTML.length < 2)
    varName.innerHTML = varName.innerHTML.padStart(2, "0");
}
////////////// interval function/////////
let interval;
function stopInterval(){
    if(interval)clearInterval(interval);
    interval = null;
}

function startInterval(func){
    if(!interval) interval = setInterval(func,1000);
    return interval;
}

////////////////// eventListener /////////////////

start.addEventListener('click', (e)=>{
    validating();
    input.value = null;
    e.preventDefault();
    startInterval(counter);
});

stopBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    stopInterval();
});

reset.addEventListener("click", (e)=>{
    e.preventDefault();
    for(i = 0 ; i < span.length;i++) span[i].innerHTML = "00";
})