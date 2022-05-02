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
  if (position.x < 1) {
    return { x: GRID_SIZE, y: position.y };
  } else if (position.x > GRID_SIZE) {
    return { x: 1, y: position.y };
  } else if (position.y < 1) {
    return { x: position.x, y: GRID_SIZE };
  } else if (position.y > GRID_SIZE) {
    return { x: position.x, y: 1 };
  } else {
    return null;
  }
  // return (
  //   position.x < 1 ||
  //   position.x > GRID_SIZE ||
  //   position.y < 1 ||
  //   position.y > GRID_SIZE
  // );
}
