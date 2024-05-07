document.addEventListener("DOMContentLoaded", function() {
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

  let gameState = 0;
  let playerO = "O";
  let playerX = "X";

  function reset() 
  {
    cells.forEach(cell => {
      cell.innerText = "";
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
        return cells[cell - 1].innerText === player;
      });
    });
  }

  function checkGameStatus() 
  {
    if (checkWin(playerX)) 
    {
      winningTxt.innerText = "Player X wins!";
      playerTurn.innerText = "";
    } 
    else if (checkWin(playerO)) 
    {
      winningTxt.innerText = "Player O wins!";
      playerTurn.innerText = "";
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
        if (!cell.innerText && !checkWin(playerX) && !checkWin(playerO)) 
        {
          cell.innerText = currentPlayer();
          gameState++;
          checkGameStatus();
          playerTurn.innerText = currentPlayer() === playerO ? "Player O's turn" : "Player X's turn";
        }
      });
    });
  }

  restartBtn.addEventListener("click", reset);

  handleClicks();
});