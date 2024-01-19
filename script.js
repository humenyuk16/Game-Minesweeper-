const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const restartBtn = document.querySelector(".restart-btn");

const totalCells = 100;
const totalBombs = 5;
const maxScore = 15;
const bombsList = [];

let score = 0;

// create grid (create 100 cells)


for (let i = 1; i<=100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", function(){
        if(bombsList.includes(i)){
            cell.classList.add("cell-bomb");
            
            endGame(false);
        }
        cell.classList.add("cell-clicked");
        updateScore();
    });
    grid.appendChild(cell);
   
}


while(bombsList.length < totalBombs) {
    // generate random number between 1 and 100
const randomNumber = Math.floor(Math.random() * totalCells)+1;
if(!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
}
}
function updateScore(){
    score++;
    scoreCounter.innerText = score.toString().padStart(5, "0");
    if(score === maxScore){
        endGame(true);
    }
}


function endGame(isVictory){
    if(isVictory){
        endGameText.innerHTML = "YOU WIN";
        playSound();
        confetti({
            particleCount: 300,
            startVelocity: 100,
            spread: 360,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.8
            }
          });
    }else{
        endGameText.innerHTML = "YOU LOSE";
        endGameText.style.color = "red";
        playSound();
    }
   
    endGameScreen.classList.remove("hidden");
}

restartBtn.addEventListener("click", function(){
    window.location.reload();
})

let winSound = new Audio("sounds/win.wav");
let loseSound = new Audio("sounds/over.wav");

function playSound(){
    if(score === maxScore){
        winSound.play();
    }else{
        loseSound.play();
    }
}