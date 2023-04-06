import { toggleColorMode } from "./modules/toggleColorMode";
import { updateFoodPosition, changeDirection } from "./modules/game";

// Color Mode

const buttonElement: Element = document.querySelector(".toggleColorMode")!;

buttonElement.addEventListener("click", toggleColorMode);

// Snake Game

updateFoodPosition();
document.addEventListener("keyup", changeDirection);

// Service Worker

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("./service-worker.js");