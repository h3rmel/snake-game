import { updateScores, updateVelocity } from "./gameUtils";

//#region Elements

const boardElement: Element = document.querySelector(".board")!;
const scoreElement: Element = document.querySelector(".score")!;
const highScoreElement: Element = document.querySelector(".high-score")!;
const controlsElements: NodeListOf<Element> =
  document.querySelectorAll(".controls i");

//#endregion

//#region Variables

let gameOver: boolean = false;
let foodPos: number[];
let snakePos: number[] = [5, 5];
let velocity: number[] = [0, 0];
let snakeBody: any[] = [];
let setGameInterval: any;

//#endregion

//#region Scores

let score: number = 0;
let highScore: number = Number(localStorage.getItem("high-score")) || 0;

highScoreElement.innerHTML = `High Score -&gt; ${highScore}`;

//#endregion

// Atualiza a posição da comida com base no grid 30x30 do jogo
export const updateFoodPosition = (): number[] =>
  (foodPos = [
    Math.floor(Math.random() * 30) + 1,
    Math.floor(Math.random() * 30) + 1,
  ]);

// Acaba o jogo caso cobra bater.
const handleGameOver = () => {
  clearInterval(setGameInterval);
  const message =
    score === 900
      ? "Parabéns! Você ganhou o jogo! Pressione OK para recomeçar..."
      : "Game Over! Pressione OK para recomeçar...";
  clearInterval(setGameInterval);
  alert(message);
  location.reload();
  alert(message);
  location.reload();
};

// Constantes para métodos de velocidade
const UP: number = -1,
  LEFT: number = -1;
const DOWN: number = 1,
  RIGHT: number = 1;

// Manipula velocidade baseado nas setinhas do teclado e controles do celular
export const changeDirection = (e: KeyboardEvent | any): void => {
  if (e.key === "ArrowUp" && velocity[1] !== DOWN)
    return updateVelocity(velocity, 0, UP);
  if (e.key === "ArrowDown" && velocity[1] !== UP)
    return updateVelocity(velocity, 0, DOWN);
  if (e.key === "ArrowLeft" && velocity[0] !== RIGHT)
    return updateVelocity(velocity, LEFT, 0);
  if (e.key === "ArrowRight" && velocity[0] !== LEFT)
    return updateVelocity(velocity, RIGHT, 0);
};

// EventListener para mudar direção baseada em qual tecla foi pressionada
controlsElements.forEach((button): void => {
  if (button instanceof HTMLElement)
    button.addEventListener("click", (): void => {
      changeDirection({ key: button.dataset.key });
    });
});

// Método responsável por iniciar e rodar o jogo
const runGame = (): true | void => {
  if (gameOver) return handleGameOver();
  let html: string = `<div class="food" style="grid-area: ${foodPos[1]} / ${foodPos[0]}"></div>`;

  // Quando a cobra comer a comida
  if (snakePos[0] === foodPos[0] && snakePos[1] === foodPos[1]) {
    updateFoodPosition();
    snakeBody.push([foodPos[1], foodPos[0]]);
    updateScores(scoreElement, highScoreElement, score, highScore);
  }

  snakePos[0] += velocity[0];
  snakePos[1] += velocity[1];

  for (let i: number = snakeBody.length - 1; i > 0; i--)
    snakeBody[i] = snakeBody[i - 1];

  snakeBody[0] = [snakePos[0], snakePos[1]];

  // Verificação se cobra bateu na parede ou não
  if (
    snakePos[0] <= 0 ||
    snakePos[0] > 30 ||
    snakePos[1] <= 0 ||
    snakePos[1] > 30
  )
    gameOver = true;

  for (let i: number = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    // Verificação se cobra bateu em sí mesma
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    )
      gameOver = true;
  }
  boardElement.innerHTML = html;
};

setGameInterval = setInterval(runGame, 99);
