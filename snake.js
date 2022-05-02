import { outsideGrid } from "./grid.js";
import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 8;

const snakeBody = [
  {
    x: 9,
    y: 9,
    id: 1,
    rotate: 0,
  },
];

let newSegments = 0;
let latestInputDirection = { x: 0, y: 0 };

export function update(newPosition) {
  addSegments();

  const inputDirection = getInputDirection();

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1].x = snakeBody[i].x;
    snakeBody[i + 1].y = snakeBody[i].y;
  }

  snakeBody[0].latestX = snakeBody[0].x;
  snakeBody[0].latestY = snakeBody[0].y;

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;

  if (!newPosition) {
    const newPosition = outsideGrid(getSnakeHead());

    if (newPosition) {
      snakeBody[0].x = newPosition.x;
      snakeBody[0].y = newPosition.y;
    }
  } else {
    snakeBody[0].x = newPosition.x;
    snakeBody[0].y = newPosition.y;
  }

  if (latestInputDirection.x == 0 && latestInputDirection.y == 0) {
    if (inputDirection.x == 1) {
      snakeBody[0].rotate += 90;
    }
  }

  if (latestInputDirection.x < inputDirection.x) {
    if (snakeBody[0].latestY > snakeBody[0].y) {
      snakeBody[0].rotate += 90;
    } else if (snakeBody[0].latestY < snakeBody[0].y) {
      snakeBody[0].rotate -= 90;
    }
  } else if (latestInputDirection.x > inputDirection.x) {
    if (snakeBody[0].latestY > snakeBody[0].y) {
      snakeBody[0].rotate -= 90;
    } else if (snakeBody[0].latestY < snakeBody[0].y) {
      snakeBody[0].rotate += 90;
    }
  } else if (latestInputDirection.y < inputDirection.y) {
    if (snakeBody[0].latestX > snakeBody[0].x) {
      snakeBody[0].rotate -= 90;
    } else if (snakeBody[0].latestX < snakeBody[0].x) {
      snakeBody[0].rotate += 90;
    }
  } else if (latestInputDirection.y > inputDirection.y) {
    if (snakeBody[0].latestX > snakeBody[0].x) {
      snakeBody[0].rotate -= 90;
    } else if (snakeBody[0].latestX < snakeBody[0].x) {
      snakeBody[0].rotate += 90;
    }
  }

  latestInputDirection = inputDirection;
}
export function draw(gameBoard) {
  snakeBody.forEach((segment, index, array) => {
    const snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;

    if (index === 0) {
      if (!snakeElement.classList.contains("snake-head")) {
        snakeElement.classList.add("snake-head");
      }
    } else if (index === 1) {
      if (!snakeElement.classList.contains("snake-body")) {
        snakeElement.classList.add("snake-body");
      }
    } else if (array.length > 3 && index === array.length - 1) {
      if (!snakeElement.classList.contains("snake-tail")) {
        snakeElement.classList.add("snake-tail");
      }
    } else if (
      (array.length > 2 && index === array.length - 2) ||
      (array.length === 3 && index === array.length - 1)
    ) {
      if (!snakeElement.classList.contains("snake-body2")) {
        snakeElement.classList.add("snake-body2");
      }
    } else {
      if (!snakeElement.classList.contains("snake-body")) {
        snakeElement.classList.add("snake-body");
      }
    }

    if (segment.rotate) {
      snakeElement.style.transform = `rotate(${segment.rotate}deg)`;
    }

    snakeElement.id = segment.id;
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({
      ...snakeBody[snakeBody.length - 1],
      id: snakeBody.length + 1,
      rotate: 0,
    });
  }

  newSegments = 0;
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
