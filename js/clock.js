// clock
const clock = (function () {

    let clockBox,
        counter,
        currentTime,
        timeForDisplay,
        btnClockSetUp,
        btnAlarmSetUp;

    // Settings Init
    function init(settings) {
        clockBox = document.querySelector(settings.clockBoxSelector);

        btnClockSetUp = document.querySelector(settings.btnClockSetUpSelector);
        btnClockSetUp.addEventListener('click', (e) => clockSetUp);

        btnAlarmSetUp = document.querySelector(settings.btnClockAlarmSelector);
        btnAlarmSetUp.addEventListener('click', (e) => clockAlarm);

        return this;
    }

    function clockRun() {
        counter = setInterval(() => {
            currentTime = new Date(Date.now());
            clockDisplay(currentTime);
        }, 100);
    }

    function clockDisplay(time) {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        timeForDisplay = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        clockBox.textContent = timeForDisplay;
    }

    function clockSetUp() {

    }

    function clockAlarm() {

    }

    clockRun();

    return {
        init,
        clockAlarm,
        clockSetUp
    }

})();

// Init stopWatcher
clock.init({
    clockBoxSelector: '.clock .clock-display',
    btnClockSetUpSelector: '.clock-control .icon-clock',
    btnClockAlarmSelector: '.clock-control .icon-clock',
});



