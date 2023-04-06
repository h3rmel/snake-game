export const toggleColorMode = (): void => {
  if(document.body.classList.contains("dark"))
    return document.body.classList.remove("dark");

  return document.body.classList.add("dark");
}