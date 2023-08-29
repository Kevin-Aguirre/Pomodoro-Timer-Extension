document.addEventListener("DOMContentLoaded", function() {
    let workSeconds_25_5 = 25 * 60;
    let restSeconds_25_5 = 5 * 60;
    let workSeconds_45_15 = 45 * 60;
    let restSeconds_45_15 = 15 * 60;
  
    let startButton25 = document.getElementById("work_25_button");
    let startButton45 = document.getElementById("work_45_button");
    let stopButton = document.getElementById("reset");
    let cycleSwitch = document.getElementById('cycleSwitch');
    let customButton = document.getElementById("reset");
    
    
    startButton25.addEventListener("click", function() {
      sendMessageToBackground("startTimer", workSeconds_25_5, restSeconds_25_5);
    });
  
    startButton45.addEventListener("click", function() {
      sendMessageToBackground("startTimer", workSeconds_45_15, restSeconds_45_15);
    });

    customButton.addEventListener("click", function() {
        let customWorkSeconds = parseInt(document.getElementById('custom-work-minutes').value) || 0;
        let customRestSeconds = parseInt(document.getElementById('custom-rest-minutes').value) || 0;
        sendMessageToBackground("startTimer", customWorkSeconds * 60, customRestSeconds * 60);
    })
  
    stopButton.addEventListener("click", function() {
      sendMessageToBackground("stopTimer");
    });

    cycleSwitch.addEventListener('click', function() {
        sendMessageToBackground('updateCycleMode', this.checked)
    })
  
    function sendMessageToBackground(action, workSeconds, restSeconds) {
      browser.runtime.sendMessage({ action, workSeconds, restSeconds });
    }
  });
  