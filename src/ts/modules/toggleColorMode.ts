export const toggleColorMode: VoidFunction = (): void => {
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("snakeColorMode", "light");
    return document.body.classList.remove("dark");
  }

  localStorage.setItem("snakeColorMode", "dark");
  return document.body.classList.add("dark");
};
