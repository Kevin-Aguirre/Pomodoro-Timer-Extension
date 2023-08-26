
document.addEventListener("DOMContentLoaded", function() {
  let interval;
  let intervalType = "";

  function formatTime(time) {
    return time < 10 ? "0" + time: time; 
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
        console.log(`the ${stateSeconds / 60} minutes are up!`);
        new Audio('beep.wav').play();
        if (onComplete) {
          onComplete();
        }
        
        updateIntervalDisplay();
      }
    }, 1000);
  }

  function updateIntervalDisplay() {
    console.log(`Update interval display has been called!, intervalDisplay = ${document.getElementById('intervalDisplay').innerHTML}`)

    var intervalDisplay = document.getElementById("intervalDisplay")
    if (intervalType === "work") {
      intervalDisplay.style.display = "block"; // Show the div
      intervalDisplay.innerText   = "work";
    } else if (intervalType === "rest") {
      intervalDisplay.style.display = "block"; // Show the div
      intervalDisplay.innerText = "rest";
    } else {
      intervalDisplay.style.display = "none"; // Hide the div
    }
  } 

  let work_25_button_ref = document.getElementById("work_25_button");
  let work_45_button_ref = document.getElementById("work_45_button");
  let reset_button_ref = document.getElementById("reset");


  work_25_button_ref.addEventListener("click", function() {
    console.log("work 25 minutes button has been pressed!")
    let workMinutes = .05
    let workSeconds = workMinutes * 60 
    let restMinutes = .05
    let restSeconds = restMinutes * 60        

    setCountdown(workSeconds, "work", function() {
      console.log("the work stage has ended")
      setCountdown(restSeconds, "rest", function() {
        intervalType = ""
        updateIntervalDisplay();
        console.log("the rest stage has ended")
      });

    })
  });

  work_45_button_ref.addEventListener("click", function() {
    console.log("work 45 minutes button has been pressed!")

    let workMinutes = .05
    let workSeconds = workMinutes * 60 
    let restMinutes = .05
    let restSeconds = restMinutes * 60 

    setCountdown(workSeconds, "work", function() {
      console.log("the work stage has ended")
      setCountdown(restSeconds, "rest", function() {
        intervalType = ""
        updateIntervalDisplay();
        console.log("the rest stage has ended")
      });

    })
  });

  reset_button_ref.addEventListener("click", function() {
    clearInterval(interval);
    var timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = "00:00";
    intervalType = "";
    updateIntervalDisplay();
  })



});
