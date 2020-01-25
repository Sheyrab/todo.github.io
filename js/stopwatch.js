// Timer
const stopWatcher = (function () {

    let countdown,
        stopWatcherDisplay,
        parentLapResult,
        alarmSound,
        buttonStart,
        buttonStopLap,
        buttonStop,
        buttonReset,
        startTime,
        secondsLeft,
        display;

    // Settings Init
    function init(settings) {
        stopWatcherDisplay = document.querySelector(settings.stopWatcherLeftSelector);
        parentLapResult = document.querySelector(settings.stopLapResultParentSelector);

        // start stopwatch
        buttonStart = document.querySelector(settings.buttonStartSelector);
        buttonStart.addEventListener('click', start);

        // stopLap stopwatch
        buttonStopLap = document.querySelector(settings.buttonStopLapSelector);
        buttonStopLap.addEventListener('click', stopLapStopwatch);

        // Stop stopwatch
        buttonStop = document.querySelector(settings.buttonStopSelector);
        buttonStop.addEventListener('click', stopStopwatch);

        // Reset stopwatch
        buttonReset = document.querySelector(settings.buttonResetSelector);
        buttonReset.addEventListener('click', ResetStopwatch);

        if (settings.alarmSound) {
            alarmSound = new Audio(settings.alarmSound);
        }
        return this;
    }

    // Start stopWatcher
    function start() {
        clearInterval(countdown);
        startTime = Date.now();
        let newBeginLap = secondsLeft;
        countdown = setInterval(() => {
            if (newBeginLap) {
                secondsLeft = newBeginLap + Math.floor((Date.now() - startTime) / 10);
            } else {
                secondsLeft = Math.floor((Date.now() - startTime) / 10);
            }
            displayStopWatcher(secondsLeft);
        }, 10);
    }

    // Counter and display counts
    function displayStopWatcher(miliSeconds) {
        milisecDisplay(miliSeconds);

         document.title = display;
         stopWatcherDisplay.textContent = display;
    }

    // End date and time of stopWatcher
    function displayEndLap(timeLeft) {
        milisecDisplay(timeLeft, 'Результат круга: ');
        addResultsLap(display);
    }

    //Convert milisec or another to hours, minutes and display it whit textBegin,
    function milisecDisplay(miliseconds, textBegin = '') {
        const hours = Math.floor((miliseconds / 100) / 3600);
        const minutes = Math.floor(((miliseconds / 100) / 60) % 60);
        const seconds = Math.floor((miliseconds / 100) % 60);
        const mseconds = Math.floor(miliseconds % 100);

        display = `${textBegin}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${mseconds < 10 ? '0' : ''}${mseconds}`;

        return display;
    }

    // Add results Lap
    function addResultsLap(text) {
        let textLap = document.createElement('P');
        textLap.className = 'display__end-time';
        textLap.textContent = text;

        parentLapResult.appendChild(textLap);
    }

    // Reset stopwatcher
    function ResetStopwatch() {
        clearInterval(countdown);
        displayStopWatcher(0);
        secondsLeft = 0;
        parentLapResult.innerHTML = ''
    }

    // Lap stopwather
    function stopLapStopwatch() {
        if (secondsLeft === 0) return;
        displayEndLap(secondsLeft);
    }

    // Stop stopWatcher
    function stopStopwatch() {
        clearInterval(countdown);
    }

    return {
        init,
        start,
        stop
    }

})();

// Init stopWatcher
stopWatcher.init({
    stopWatcherLeftSelector: '.display__time-left',
    stopLapResultParentSelector: '.display-lap',
    alarmSound: 'audio/bell.mp3',
    formNameSelector: 'stopwatchForm',
    inputSelector: 'minutes',
    buttonStartSelector: '[data-start]',
    buttonStopLapSelector: '[data-lap]',
    buttonStopSelector: '[data-stop]',
    buttonResetSelector: '[data-reset]'
});



