import { toggleColorMode } from "./modules/toggleColorMode";
import { updateFoodPosition, changeDirection } from "./modules/game";

// Color Mode

window.addEventListener("load", () => {
  const preferredTheme: string = localStorage.getItem("snakeColorMode")!;

  if (preferredTheme === "dark") document.body.classList.add("dark");
});

const buttonElement: Element = document.querySelector(".toggleColorMode")!;

buttonElement.addEventListener("click", toggleColorMode);

// Snake Game

updateFoodPosition();
document.addEventListener("keyup", changeDirection);
