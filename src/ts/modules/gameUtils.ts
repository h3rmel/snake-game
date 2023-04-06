export const updateVelocity = (velocity: number[], vx: number, vy: number) => {
  velocity[0] = vx;
  velocity[1] = vy;
};

export const updateScores = (
  scoreElement: Element,
  highScoreElement: Element,
  score: number,
  highScore: number
): void => {
  score++;
  highScore = score >= highScore ? score : highScore;

  localStorage.setItem("high-score", String(highScore));
  scoreElement.innerHTML = `Score -&gt; ${score}`;
  highScoreElement.innerHTML = `High Score -&gt; ${highScore}`;
};
