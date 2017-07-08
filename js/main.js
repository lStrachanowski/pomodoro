$(document).ready(function() {

  var timeCount, sec = 60, min = 25, minToDraw = 0, breakMin = 5, clickCount = 1, currVal = null,
  setMin = 25, setBreakMin = 5, state = "", drawArcLine = 0;

  $(document).on('change', function() {
    currVal = $('input:radio[name=option]:checked').val();
  });

  $("#plus").click(function() {
    if (currVal === "break") {
      setBreakMin++;
      $("#breakValue").html(setBreakMin);
    }
    if (currVal === "work") {
      setMin++;
      $("#workValue").html(setMin);
    }
  });

  $("#minus").click(function() {
    if (currVal === "break") {
      if(setBreakMin > 1){
        setBreakMin--;
      }

      $("#breakValue").html(setBreakMin);
    }
    if (currVal === "work") {
      if(setMin > 1){
        setMin--;
      }
      $("#workValue").html(setMin);
    }
  });


  $("div.centerDigits").click(function() {
    var tempState = "";
    tempState = state;
    if (clickCount % 2 == 0) {
      clearInterval(timeCount);
    } else {
      if (clickCount == 1 && min > 1) {
        setTimeout(function() {
          minToDraw = min;
          min = min - 1;
          $("div.displayMin").html(min);
        }, 10);
      }
      timeCount = setInterval(myFunc, 1000);
      $("div.displayMin").html(min);
      if (state == "" || state == "work") {
        state = "work";
      } else {
        state = "break";
      }
    }

    $("#setButton").html("Set pomodoro");
    clickCount++;
  });

  $("#setButton").click(function() {
    clearInterval(timeCount);
    $("div.displayMin").html(setMin);
    $("div.displaySec").html("00");
    minToDraw = setMin;
    min = setMin - 1;
    breakMin = setBreakMin;
    sec = 60;
    clickCount = 3;
    $("#setButton").html("Click " + setMin + ":" + "00" + " to start");
  });

  function myFunc() {
    sec -= 1;
    $("div.displaySec").html(sec);
    $("#stateDisplay").html(state);

    if (sec == 0) {
      if (min == 0 && sec == 0 && state == "work") {
        min = breakMin;
        minToDraw = min;
        state = "break";
      } else if (min == 0 && sec == 0 && state == "break") {
        min = setMin;
        minToDraw = min;
        state = "work";
      }
      min -= 1;
      sec = 60;
      $("div.displaySec").html("00");
    }else{
      $("div.displayMin").html(min);
    }
    if (sec < 10) {
      $("div.displaySec").html(0 + "" + sec);
    }
    drawArcLine =  countPercent(min,minToDraw);
    var myCanvas = document.getElementById('myCanvas');
    myCanvas.width = 400;
    myCanvas.height = 400;
    var ctx = myCanvas.getContext("2d");
      drawArc(ctx, 200, 200, 188, Math.PI * 1.5, Math.PI * drawArcLine );
  }

  function countPercent(minValue,totalMin){
    var oneP = 0.02;
    const retVal = 1.5;
    var value = (((minValue*100)/totalMin)*oneP)+retVal;
    console.log(minValue + "  " + totalMin + " " + value);
    return value;
  }


  function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 25;
    ctx.strokeStyle = 'rgb(84, 186, 180)';
    ctx.stroke();
  }


});
