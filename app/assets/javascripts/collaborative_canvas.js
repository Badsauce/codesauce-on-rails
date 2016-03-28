//Get elements we need
var painting = document.getElementById('CanvasContainer');
var canvas = document.getElementById('CollaborativeCanvas');
var clearButton = document.getElementById('clearHistory');

//initalize the canvas
var context = canvas.getContext('2d');

//Set the canvas to the size of it's container
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

//Object for capturing mouse movements within the canvas
var mouse = {x: 0, y: 0};

var myHistoryID = 1;
var partnerHistoryID = 2;

var canvasHistory = new Array();
var unsentHistory = new Array();
var partnerHistory = new Array();

var color = '#00CC99';
var isPainting;
var id = 1;
var syncTimerID;


function addClick(x, y, dragging, brush_color)
{
  canvasHistory.push({"x":x,"y":y,"drag":dragging,"color":brush_color})
  unsentHistory.push({"x":x,"y":y,"drag":dragging,"color":brush_color})
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = color;
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < canvasHistory.length; i++) {
    context.beginPath();
    if(canvasHistory[i].drag && i){
      context.moveTo(canvasHistory[i-1].x, canvasHistory[i-1].y);
     }else{
       context.moveTo(canvasHistory[i].x-1, canvasHistory[i].y);
     }
     context.lineTo(canvasHistory[i].x, canvasHistory[i].y);
     context.closePath();
     context.stroke();
  }

  for(var i=0; i < partnerHistory.length; i++) {
    context.beginPath();
    if(partnerHistory[i].drag && i){
      context.moveTo(partnerHistory[i-1].x, partnerHistory[i-1].y);
     }else{
       context.moveTo(partnerHistory[i].x-1, partnerHistory[i].y);
     }
     context.lineTo(partnerHistory[i].x, partnerHistory[i].y);
     context.closePath();
     context.stroke();
  }
}

var onPaint = function() {
  context.lineTo(mouse.x, mouse.y);
  context.stroke();
};

function getHistory(){
  return $.get('/collaborative_canvas/history', function( data ) {
    if(data.history){
      partnerHistory = data.history;
    }
    redraw()
    console.log('History set to server history');
  });
}

function sendHistory(){
  var sentHistoryLength = unsentHistory.length
  return $.ajax({
    method: "POST",
    url: "/collaborative_canvas/history",
    data: JSON.stringify({'id':id,'history':unsentHistory}),
    contentType: 'application/json',
  }).done(function( data ) {
    if(sentHistoryLength < unsentHistory.length) {
      console.log('Slicing '+sentHistoryLength+' from unsent history of '+unsentHistory.length);
      unsentHistory = unsentHistory.slice(sentHistoryLength);
    }
    else {
      console.log('No unsent history clearing unsent array');
      unsentHistory = new Array();
    }
    console.log('History written, receiving updated history');
    getHistory().done( function(){
      window.setTimeout(synchronizeHistory, 500);
    });
  });
}

function clearHistory(){
  canvasHistory = new Array();
  unsentHistory = new Array();
  partnerHistory = new Array();
  window.clearTimeout(syncTimerID);
  return $.ajax({
    method: "POST",
    url: "/collaborative_canvas/clear_history",
    data: JSON.stringify({'id':id}),
    contentType: 'application/json',
  }).done(function( data ) {
    console.log('History written, receiving updated history');
    getHistory().done( function(){
      syncTimerID = window.setTimeout(synchronizeHistory, 500);
    });
  });
}

function toggleHistoryID(){
  var tempID = myHistoryID;
  myHistoryID = partnerHistoryID;
  partnerHistoryID = tempID;
  console.log("Writing ID: "+myHistoryID+" Reading ID: "+partnerHistoryID);
}

function synchronizeHistory(){
  if(unsentHistory.length > 0){
    sendHistory();
  }
  else {
    getHistory().done( function(){
      syncTimerID = window.setTimeout(synchronizeHistory, 500);
    });
  }
}

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;

  if(isPainting){
    addClick(mouse.x, mouse.y, true, color);
    redraw();
  }
}, false);

canvas.addEventListener('mousedown', function(e) {
  isPainting = true;
  addClick(mouse.x, mouse.y);
  redraw();
}, false);

canvas.addEventListener('mouseup', function() {
  isPainting = false;
}, false);

canvas.addEventListener('mouseleave', function() {
  isPainting = false;
}, false);

clearButton.addEventListener('click', clearHistory , false);

getHistory()
syncTimerID = window.setTimeout(synchronizeHistory, 500);
