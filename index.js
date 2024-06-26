document.addEventListener("DOMContentLoaded", function() 
{
  const restartBtn = document.querySelector("#resetBtn");
  const board = document.querySelector("#board");
  const winningTxt = document.querySelector("#winningtxt");
  const playerTurn = document.querySelector("#playerturn");
  const cells = document.querySelectorAll(".cell");

  const winningCombos = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9],
      [1, 4, 7], [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [7, 5, 3]
  ];

  const winSound = document.getElementById("winSound");
  const clickSound = document.getElementById("clickSound");

  let gameState = 0;
  let playerO = "O";
  let playerX = "X";

  function reset() 
  {
      cells.forEach(cell => {
          cell.innerText = "";
          cell.dataset.content = "";
      });
      gameState = 0;
      playerTurn.innerText = "Player O's turn";
      winningTxt.innerText = "";
  }

  let currentPlayer = () => 
    {
      return gameState % 2 === 0 ? playerO : playerX;
    };

  function checkWin(player) 
  {
      return winningCombos.some(combo => {
          return combo.every(cell => {
              return cells[cell - 1].dataset.content === player;
          });
      });
  }

  function checkGameStatus() 
  {
      if (checkWin(playerX)) 
      {
          winningTxt.innerText = "Player X wins!";
          playerTurn.innerText = "";
          winSound.play();
      } 
      else if (checkWin(playerO)) 
      {
          winningTxt.innerText = "Player O wins!";
          playerTurn.innerText = "";
          winSound.play();
      } 
      else if (gameState === 9) 
      {
          winningTxt.innerText = "It's a draw!";
          playerTurn.innerText = "";
      }
  }

  function handleClicks() 
  {
      cells.forEach(cell => {
          cell.addEventListener("click", () => {
              if (!cell.dataset.content && !checkWin(playerX) && !checkWin(playerO)) 
              {
                  cell.dataset.content = currentPlayer();
                  gameState++;
                  checkGameStatus();
                  playerTurn.innerText = currentPlayer() === playerO ? "Player O's turn" : "Player X's turn";
                  clickSound.play(); 
              }
          });
      });
  }

  restartBtn.addEventListener("click", reset);

  handleClicks();
});
