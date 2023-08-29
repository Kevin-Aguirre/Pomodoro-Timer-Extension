let interval;
let intervalType = "";
let cycleMode = false

function formatTime(time) {
    return time < 10 ? "0" + time: time; 
}

function executeCycle(workSeconds, restSeconds) {
setCountdown(workSeconds, "work", function() {
    alert(`Work Interval Over\nMinutes Worked: ${workSeconds / 60}`)
    setCountdown(restSeconds, "rest", function() {
    alert(`Rest Interval Over\nMinutes Rested: ${restSeconds / 60}`)
    intervalType = ""
    updateIntervalDisplay();
    if (cycleMode) {
        cycle(workSeconds, restSeconds);

    }
    });
})
}

function cycle(workSeconds, restSeconds) {
executeCycle(workSeconds, restSeconds)
}

function setCountdown(stateSeconds, type, onComplete) {
    clearInterval(interval);
    intervalType = type;
    updateIntervalDisplay();
    interval = setInterval(function() {
        updateIntervalDisplay();  
        if (stateSeconds > 0) {
            var minutes = Math.floor(stateSeconds / 60);
            var seconds = stateSeconds % 60;
            var timerDisplay = document.getElementById("timer");
            timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
            stateSeconds--;
        } else {
            clearInterval(interval);
            var timerDisplay = document.getElementById("timer");
            timerDisplay.textContent = "00:00";
            new Audio('popup/beep.wav').play();
            if (onComplete) {
                onComplete();
            }
        updateIntervalDisplay();
    
        }
}, 1000);
}

function updateIntervalDisplay() {
var intervalDisplay = document.getElementById("intervalDisplay")
if (intervalType === "work") {
    intervalDisplay.style.display = "block"; // Show the div
    intervalDisplay.innerText   = "Work";
} else if (intervalType === "rest") {
    intervalDisplay.style.display = "block"; // Show the div
    intervalDisplay.innerText = "Rest";
} else {
    intervalDisplay.style.display = "none"; // Hide the div
}
} 

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startTimer") {
      let workSeconds = request.workSeconds;
      let restSeconds = request.restSeconds;
      executeCycle(workSeconds, restSeconds);
    } else if (request.action === "stopTimer") {
      clearInterval(interval);
      intervalType = "";
      var timerDisplay = document.getElementById("timer"); // Change this line to match your timer display element
      timerDisplay.textContent = "00:00"; // Reset the display to 00:00
      updateIntervalDisplay();      // ... Timer stop logic ...
    } else if (request.action === "updateCycleMode") {
      cycleMode = request.cycleMode;
    }
  });