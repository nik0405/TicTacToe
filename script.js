// Write your code here.
const heading = document.getElementById('game-heading');
const restartButton = document.getElementById('restart-button');
const squareCollection = document.querySelectorAll('.game-square');
let currentPlayer;
let totalMoves;
const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

//To ahndle the restart scenario as well
function initGame(){
  heading.textContent = "Player 1's Turn";
  currentPlayer = 1;
  totalMoves = 0;
}

function startGame() {
  initGame();
  squareCollection.forEach((box,index) => {
    box.disabled = false;
    box.textContent = "";
    box.addEventListener('click' , boxClickHandler);
  })
}

function boxClickHandler(e){
  const curBox = e.target;
  curBox.textContent = currentPlayer === 1 ? 'X' : 'O';

  if(checkWinning(curBox.textContent)){
    gameEnd();
    heading.textContent = `Player ${currentPlayer} Won!`;
    return;
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    heading.textContent = `Player ${currentPlayer}'s Turn'`;
    totalMoves++;
    checkIfTie();
  }
}

function checkWinning(currentTurnContent) {
  return winningCombinations.some(comb => {
    return comb.every(c=> squareCollection[c].textContent == currentTurnContent)
  })
};

function checkIfTie(){
  if(totalMoves == squareCollection.length){
    heading.textContent = "Tie Game!";
    gameEnd();
  }
}

function gameEnd(){
  restartButton.style.display = "block";
  squareCollection.forEach((box,index) => {
    box.disabled = true;
   })
}

restartButton.addEventListener('click' , function() {
  restartButton.style.display = "none";
  startGame();
})

startGame();












