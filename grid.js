const GRID_SIZE = 17;

export function randomGridPosition() {
  let position = Math.floor(Math.random() * GRID_SIZE) + 1;

  if (
    position === 1 ||
    position === 17 ||
    position === -1 ||
    position === -17
  ) {
    randomGridPosition();
  } else {
    return {
      x: position,
      y: position,
    };
  }
}

export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}
