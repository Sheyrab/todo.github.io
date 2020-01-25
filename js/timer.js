// Timer
const timer = (function () {

    let countdown,
        timerDisplay,
        endTime,
        alarmSound,
        buttons,
        buttonStop,
        form,
        textInput;

    // Settings
    function init(settings) {
        timerDisplay = document.querySelector(settings.timerLeftSelector);
        endTime = document.querySelector(settings.timerEndSelector);

        // start by click
        buttons = document.querySelectorAll(settings.buttonsSelector);
        if (buttons.length === 0) return console.log('Please init module first');
        buttons.forEach(btn => btn.addEventListener('click', startTimerByClick));

        // start by formInput
        form = document.forms[settings.formNameSelector];
        textInput = form.elements[settings.inputSelector];
        if (form === undefined || textInput === undefined) return console.log('Please init module first');
        form.addEventListener('submit', startTimerByForm);

        // stop timer
        buttonStop = document.querySelector(settings.buttonStopSelector);
        if (buttonStop === null) return console.log('Please init module first');
        buttonStop.addEventListener('click', (e) => stop.call(start));

        // alarm settings
        if (settings.alarmSound) {
            alarmSound = new Audio(settings.alarmSound);
        }

        return this;
    }

    // Start timer
    function start(seconds) {
        if (!timerDisplay || !endTime) return console.log('Please init module first');
        if (!seconds || typeof seconds !== 'number') return console.log('Please provide seconds');

        clearInterval(countdown);
        alarmSound.pause();
        alarmSound.currentTime = 0;

        const nowTime = Date.now();
        const thenTime = nowTime + seconds * 1000;

        displayTimeLeft(seconds);
        displayEndTime(thenTime);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((thenTime - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdown);
                playSound();
                return;
            }
            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    // Counter and display counts
    function displayTimeLeft(seconds) {
        const days = Math.floor(seconds / 86400);
        const hour = Math.floor((seconds / 3600) % 24 );
        const minutes = Math.floor((seconds / 60) % 60);
        const reminderSeconds = seconds % 60;
        let display;
        if (days === 0) {
             display = `${hour > 0 ? `${hour}:` : ''}${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
            } else {
             display = `${`${days} day `} ${hour > 0 ? `${hour}:` : ''}${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        }

        document.title = display;
        timerDisplay.textContent = display;
    }

    // End date and time of timer
    function displayEndTime(timestamp) {
        const now = new Date(Date.now());
        const end = new Date(timestamp);

        const hours = end.getHours();
        const minutes = end.getMinutes();
        const day = end.getDate();
        const month = end.toLocaleString('en', { month: 'long'});
        if (now.getDate() === end.getDate()) {
            endTime.textContent = `Be back at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        } else {
            endTime.textContent = `Be back at ${day} ${month} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        }
    }

    // Play sound
    function playSound() {
        alarmSound.play();
    }

    // Start timer by click
    function startTimerByClick() {
        const seconds = parseInt(this.dataset.time);
        timer.start(seconds);
    }

    // Start timer by form
    function startTimerByForm(e) {
        e.preventDefault();

        if (!textInput.value) {
            textInput.classList.add('invalid');
            setTimeout(() => textInput.classList.remove('invalid'), 500);
        } else {
            timer.start(textInput.value * 60);
            form.reset();
        }
    }

    // Stop timer
    function stop() {
        clearInterval(countdown);
        displayTimeLeft(0);
        endTime.textContent = 'Lost time is never found again';
    }

    return {
        init,
        start,
        stop
    }

})();

// Init timer
timer.init({
    timerLeftSelector: '.display__time-left',
    timerEndSelector: '.display__end-time',
    alarmSound: 'audio/bell.mp3',
    buttonsSelector: '[data-time]',
    formNameSelector: 'customForm',
    inputSelector: 'minutes',
    buttonStopSelector: '[data-stop]'
});



