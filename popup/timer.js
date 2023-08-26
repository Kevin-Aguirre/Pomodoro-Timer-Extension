
document.addEventListener("DOMContentLoaded", function() {
  let interval;

  function formatTime(time) {
    return time < 10 ? "0" + time: time; 
  }
  
  function setCountdown(stateSeconds, onComplete) {
    clearInterval(interval); // Clear any ongoing timer
    console.log("i am now in the function setCountdown");
    interval = setInterval(function() {
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
      }
    }, 1000);
  }

  let work_25_button_ref = document.getElementById("work_25_button");
  let work_45_button_ref = document.getElementById("work_45_button");
  let reset_button_ref = document.getElementById("reset");


  work_25_button_ref.addEventListener("click", function() {
    let workMinutes = .10
    let workSeconds = workMinutes * 60 
    let restMinutes = .05
    let restSeconds = restMinutes * 60 

    setCountdown(workSeconds, function() {
      setCountdown(restSeconds);
    })
  });

  work_45_button_ref.addEventListener("click", function() {
    let workMinutes = .30
    let workSeconds = workMinutes * 60 
    let restMinutes = .15
    let restSeconds = restMinutes * 60 

    setCountdown(workSeconds, function() {
      setCountdown(restSeconds);
    })  
  });

  reset_button_ref.addEventListener("click", function() {
    clearInterval(interval);
    var timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = "00:00";
  })



});
