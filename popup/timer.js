
document.addEventListener("DOMContentLoaded", function() {
  let interval;
  let intervalType = "";
  let cycleMode = false

  let work_25_button_ref = document.getElementById("work_25_button");
  let work_45_button_ref = document.getElementById("work_45_button");


  let custom_button_ref = document.getElementById('custom_button');
  let custom_work_field = document.getElementById('custom-work-minutes');
  let custom_rest_field = document.getElementById('custom-rest-minutes');

  let reset_button_ref = document.getElementById("reset");
  let cycleSwitch = document.getElementById('cycleSwitch');
  
  let workSeconds_25_5 = 25 * 60
  let restSeconds_25_5 = 5 * 60
  let workSeconds_45_15 = 45 * 60
  let restSeconds_45_15 = 15 * 60



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
        new Audio('beep.wav').play();
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

  work_25_button_ref.addEventListener("click", function() { 
    executeCycle(workSeconds_25_5, restSeconds_25_5)
  });

  work_45_button_ref.addEventListener("click", function() {
    executeCycle(workSeconds_45_15, restSeconds_45_15)
  });

  custom_work_field.addEventListener('click', function(event) {
    event.stopPropagation();
  })

  custom_rest_field.addEventListener('click', function(event) {
    event.stopPropagation();
  })

  custom_button_ref.addEventListener("click", function() {
    custom_work_minutes = Number(document.getElementById('custom-work-minutes').value) 
    custom_rest_minutes = Number(document.getElementById('custom-rest-minutes').value)  
    if ((Number.isInteger(custom_work_minutes)) && (Number.isInteger(custom_rest_minutes))) {
      custom_work_minutes *= 60
      custom_rest_minutes *= 60   
      executeCycle(custom_work_minutes, custom_rest_minutes);

    } 


  })

  reset_button_ref.addEventListener("click", function() {
    clearInterval(interval);
    var timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = "00:00";
    intervalType = "";
    updateIntervalDisplay();
  })

  cycleSwitch.addEventListener('change', function() {
    cycleMode = this.checked;
  })

});
