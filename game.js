var myGamePiece;

var myGameArea = {
  canvas: document.createElement("canvas"),

  start: function (numOfElements) {
    this.canvas.id = "myGameCanvas";
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.numOfElements = numOfElements;
    this.interval = setInterval(updateGameArea, 17);
    this.numOfDestroyedElements = 0
    updateNumOfElements
    this.canvas.addEventListener("click", (event) => {
      clickX = event.clientX
      clickY = event.clientY
      for(let i = 0; i < this.numOfElements - this.numOfDestroyedElements; i++) {
        if (gameElements[i].intersects(clickX, clickY)){
          gameElements.splice(i, 1)
          this.numOfDestroyedElements += 1;
          break;
        }
      }
    })
  },

  stop: function () {
    clearInterval(this.interval);
    updateNumOfElements()
  },

  continue: function (){
    this.interval = setInterval(updateGameArea, 17)
  },

  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speed_x = getRandomNumber(-3, 3);
  this.speed_y = getRandomNumber(-3, 3);
  this.x = x;
  this.y = y;

  this.update = function () {
    ctx = myGameArea.context;
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
    updateNumOfElements()
  };

  this.newPos = function () {
    if (this.x < 0 || (this.x + this.width) > myGameArea.canvas.width){
        this.speed_x *= -1;
        this.speed_x += getRandomNumber(-1, 1)
    } 
    if (this.y < 0 || (this.y + this.height) > myGameArea.canvas.height){
        this.speed_y *= -1;
        this.speed_y += getRandomNumber(-1, 1)
    }

    this.x += this.speed_x;
    this.y -= this.speed_y;
  };

  this.intersects = function (x, y){
    if (x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height)){
      return true;
    }
    return false;
  }
}

function startGame() {
  gameElements = []
  let numOfElements = getRandomNumber(5, 10)
  for(let i = 0; i < numOfElements; i++){
      gamePiece = new component(50, 50, "blue", getRandomNumber(20, 540), getRandomNumber(20, 340));
      gameElements.push(gamePiece)
  }
  myGameArea.start(numOfElements);
}

function updateNumOfElements(){
  ctx = myGameArea.context;
  ctx.save();
  ctx.font = "16px Arial";
  let elementsText = "Elements: " + myGameArea.numOfElements;
  let destoryedText = "Destroyed: " + myGameArea.numOfDestroyedElements;
  ctx.fillText(elementsText, 500, 20);
  ctx.fillText(destoryedText, 15, 20)
  ctx.restore();
}

function stopGame(isRetry = false){
  myGameArea.stop()
  removeMessage()
  if (!isRetry){
    document.getElementById("continueBtn").hidden = false
    document.getElementById("stopBtn").hidden = true
  } else {
    document.getElementById("continueBtn").hidden = true
    document.getElementById("stopBtn").hidden = false
  }
}

function continueGame(){
  myGameArea.continue()
  document.getElementById("continueBtn").hidden = true
  document.getElementById("stopBtn").hidden = false
}

function retryGame(){
  stopGame(true)
  startGame()
}

function updateGameArea() {
  myGameArea.clear();
  let activeElements = myGameArea.numOfElements - myGameArea.numOfDestroyedElements 
  for(let i = 0; i < activeElements; i++){
      gameElements[i].newPos();
      gameElements[i].update()
  }
  if (activeElements === 0){
    stopGame(true)
    showMessage()
  }
}

function getRandomNumber(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    while(num === 0){
      num = Math.floor(Math.random() * (max - min + 1) + min);
    } 
    return num;
}

function showMessage(){
  let tekst = document.getElementById("successMessage")
  tekst.innerText = "Čestitke, pogodili ste sve mete!"
}

function removeMessage(){
  let tekst = document.getElementById("successMessage")
  tekst.innerText = ""
}
