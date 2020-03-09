// get the relevant elements

const countdownTime = document.querySelector('#time-left');

const sessionTime = document.querySelector('#session-time');
const breakTime = document.querySelector('#break-time');

const stopSession = document.querySelector('#stop');
const playSession = document.querySelector('#play');
const pauseSession = document.querySelector('#pause');
const restartSession = document.querySelector('#restart');

const sessionTimeDec = document.querySelector('#session-time-dec');
const sessionTimeInc = document.querySelector('#session-time-inc');
const breakTimeDec = document.querySelector('#break-time-dec');
const breakTimeInc = document.querySelector('#break-time-inc');

// flags

let TimerState = {
    STOPPED: 0,
    PAUSED: 1,
    PLAY: 2,
};

let timerState = TimerState.STOPPED;

// global variables

var pomoClock = {
    sessionMins: 25,
    breakMins: 5,
    timeLeft: 25 * 60,
    timer: null,
    getInitDuration: function() {
        return this.sessionMins * 60;
    },
    getDisplayString: function() {
        let minutes = parseInt(this.timeLeft / 60, 10);
        let seconds = parseInt(this.timeLeft % 60, 10);
    
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
    
        return minutes + ":" + seconds;
    },
}

// add event to play button

playSession.addEventListener('click', countdown);

function countdown(e) {
    let duration;

    if (timerState === TimerState.PLAY) {
        return;
    }
    
    timerState = TimerState.PLAY;
    pomoClock.timer = setInterval(startTimer, 1000);
}

function startTimer() {
    countdownTime.textContent = pomoClock.getDisplayString();
    
    pomoClock.timeLeft--;
    if (!(pomoClock.timeLeft > 0)) {
        resetTimer();
    }
}

function resetTimer() {
    countdownTime.textContent = pomoClock.sessionMins + ':00';
    pomoClock.timeLeft = pomoClock.sessionMins * 60;
    timerState = TimerState.STOPPED;
    clearInterval(pomoClock.timer);
}

// add event to stop button

stopSession.addEventListener('click', resetTimer);

// add event to pause button

pauseSession.addEventListener('click', pause);

function pause(e) {
    if (timerState = TimerState.PLAY) {
        timerState = TimerState.PAUSED;
        clearInterval(pomoClock.timer); 
    }
}

// add event to sync button

restartSession.addEventListener('click', restart);

function restart(e) {
    countdownTime.textContent = pomoClock.sessionMins + ':00';
    pomoClock.timeLeft = pomoClock.sessionMins * 60;    
}