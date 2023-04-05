const board: Element = document.querySelector(".board");
const scoreElement: Element = document.querySelector(".score");
const highScoreElement: Element = document.querySelector(".high-score");
const controls: NodeListOf<Element> = document.querySelectorAll(".controls i");

let gameOver: boolean = false;
let foodX: number, foodY: number;
let snakeX = 5,
  snakeY = 5;
let velocityX = 0,
  velocityY = 0;
let snakeBody: any[] = [];
let setIntervalId: number;
let score = 0;

// Get high score from local storage

let highScore: number = Number(localStorage.getItem("high-score")) || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

// Pass a random between 1 and 30 as food position

const updateFoodPosition = (): void => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = (): void => {
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to replay...");
  location.reload();
};

// Change velocity value based on key press

const changeDirection = (e: KeyboardEvent | any): void => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Change Direction on each key click

controls.forEach((button): void =>
  button.addEventListener("click", (): void =>
    changeDirection({ key: button.dataset.key })
  )
);

const initGame = (): void | true => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // When snake eat food
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]); //Add food to snake body array
    score++;
    highScore = score >= highScore ? score : highScore; // if score > high score => high score = score

    localStorage.setItem("high-score", String(highScore));
    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;
  }

  // Update Snake Head
  snakeX += velocityX;
  snakeY += velocityY;

  // Shifthing forward values of elements in snake body by one

  for (let i: number = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  // Check snake body is out of wall or no

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }

  // Add div for each part of snake body

  for (let i: number = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    // Check snake head hit body or no
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  board.innerHTML = html;
};

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
