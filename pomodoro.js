// get the relevant elements

const countdownTime = document.querySelector('#time-left');
const clockStatus = document.querySelector('#clock-status');

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

let PomoState = {
    SESSION: 0,
    BREAK: 1,
};

// global variables

const secsInAMin = 60;

class PomoClock {
    constructor(display, status, sessionTimeDisplay, breakTimeDisplay, sessionMins, breakMins) {
        this.display = display;
        this.status = status;
        this.sessionTimeDisplay = sessionTimeDisplay;
        this.breakTimeDisplay = breakTimeDisplay;

        this.sessionMins = sessionMins;
        this.breakMins = breakMins;

        this.timer = null;
        this.timeLeft = this.sessionMins * secsInAMin;
        this.timerState = TimerState.STOPPED;
        this.pomoState = PomoState.SESSION;
    }

    getDisplayString() {
        let minutes = parseInt(this.timeLeft / secsInAMin, 10);
        let seconds = parseInt(this.timeLeft % secsInAMin, 10);
    
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
    
        return minutes + ":" + seconds;
    }
    
    startClock() {
        if (this.timerState === TimerState.PLAY) {
            return;
        }
        
        this.timerState = TimerState.PLAY;
        this.timer = setInterval(() => this.playClock(), 1000);
    }
    
    playClock() {
        if (!(this.timeLeft >= 1)) {
            this.toggleState();
        }

        this.timeLeft--;
        this.display.textContent = this.getDisplayString();
    }

    toggleState() {
        if (this.pomoState === PomoState.SESSION) {
            this.pomoState = PomoState.BREAK;
            this.status.textContent = "Break";
            this.timeLeft = this.breakMins * 60;
        }
        else {
            this.pomoState = PomoState.SESSION;
            this.status.textContent = "Session";
            this.timeLeft = this.sessionMins * 60;
        }
    }

    stopClock() {
        this.timerState = TimerState.STOPPED;
        this.resetClock();
        clearInterval(this.timer);
    }

    pauseClock() {
        if (this.timerState = TimerState.PLAY) {
            this.timerState = TimerState.PAUSED;
            clearInterval(this.timer); 
        }
    }

    restartClock() {
        if (this.pomoState === PomoState.SESSION) {
            let minutes = this.sessionMins < 10 ? "0" + this.sessionMins : this.sessionMins;
            this.display.textContent = minutes + ':00';
            this.timeLeft = this.sessionMins * secsInAMin;
        }
        else {
            let minutes = this.breakMins < 10 ? "0" + this.breakMins : this.breakMins;
            this.display.textContent = minutes + ':00';
            this.timeLeft = this.breakMins * secsInAMin;
        }
    }

    resetClock() {
        this.PomoState = PomoState.SESSION;
        this.status.textContent = "Session";
        this.restartClock();
    }

    // settings

    incSessionMins() {
        this.sessionMins++;
        this.sessionTimeDisplay.textContent = this.sessionMins;
        if (this.timerState === TimerState.STOPPED) {
            this.resetClock();
        }
    }

    decSessionMins() {
        if (this.sessionMins > 1) {
            this.sessionMins--;
            this.sessionTimeDisplay.textContent = this.sessionMins;
            if (this.timerState === TimerState.STOPPED) {
                this.resetClock();
            }
        }
    }

    incBreakMins() {
        this.breakMins++;
        this.breakTimeDisplay.textContent = this.breakMins;        
    }

    decBreakMins() {
        if (this.breakMins > 1) {
            this.breakMins--;
            this.breakTimeDisplay.textContent = this.breakMins;        
        }
    }
}

let pomodoroClock = new PomoClock(countdownTime, clockStatus, sessionTime, breakTime, 25, 5);

// add event to play button

playSession.addEventListener('click', start);

function start(e) {
    pomodoroClock.startClock();
}

// add event to stop button

stopSession.addEventListener('click', stop);

function stop(e) {
    pomodoroClock.stopClock();
}

// add event to pause button

pauseSession.addEventListener('click', pause);

function pause() {
    pomodoroClock.pauseClock();
}

// add event to sync button

restartSession.addEventListener('click', restart);

function restart(e) {
    pomodoroClock.restartClock();
}

// timer settings

// session minutes increase event

sessionTimeInc.addEventListener('click', increaseSessionMins);

function increaseSessionMins(e) {
    pomodoroClock.incSessionMins();
}

// session minutes decrease event

sessionTimeDec.addEventListener('click', decreaseSessionMins);

function decreaseSessionMins(e) {
    pomodoroClock.decSessionMins();
}

// break minutes increase event

breakTimeInc.addEventListener('click', increaseBreakMins);

function increaseBreakMins(e) {
    pomodoroClock.incBreakMins();
}

// break minutes decrease event

breakTimeDec.addEventListener('click', decreaseBreakMins);

function decreaseBreakMins(e) {
    pomodoroClock.decBreakMins();
}