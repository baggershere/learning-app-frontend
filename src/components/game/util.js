import { array } from "prop-types";

export const calculateCategoryX = (width, index) => {
  return index === 1 || index === 4 || index === 7 || index === 10
    ? width * 0.2
    : index === 2 || index === 5 || index === 8 || index === 11
    ? width * 0.5
    : index === 3 || index === 6 || index === 9 || index === 12
    ? width * 0.8
    : 0;
};
export const calculateCategoryY = (height, index) => {
  return index >= 1 && index <= 3
    ? height * 0.33
    : index >= 4 && index <= 6
    ? height * 0.66
    : index >= 7 && index <= 9
    ? height * 1
    : 0;
};
export const selectRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
// export function shuffle(array) {
//   //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }
export function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const placeBox = (arrayLength, index, stage, phone, type) => {
  let x;
  let y;
  if (!phone) {
    if (arrayLength === 3) {
      if (index === 0) {
        x = stage.canvas.width * 0.2;
        y =
          type === "box"
            ? stage.canvas.height * 0.5
            : stage.canvas.height * 0.65;
      }
      if (index === 1) {
        x = stage.canvas.width * 0.4;
        y =
          type === "box"
            ? stage.canvas.height * 0.5
            : stage.canvas.height * 0.65;
      }
      if (index === 2) {
        x = stage.canvas.width * 0.6;
        y =
          type === "box"
            ? stage.canvas.height * 0.5
            : stage.canvas.height * 0.65;
      }
    }
    if (arrayLength === 4) {
      if (index === 0) {
        x = stage.canvas.width * 0.1;
        y = stage.canvas.height * 0.5;
      }
      if (index === 1) {
        x = stage.canvas.width * 0.3;
        y = stage.canvas.height * 0.5;
      }
      if (index === 2) {
        x = stage.canvas.width * 0.5;
        y = stage.canvas.height * 0.5;
      }
      if (index === 3) {
        x = stage.canvas.width * 0.7;
        y = stage.canvas.height * 0.5;
      }
    }
    if (arrayLength === 5) {
      if (index === 0) {
        x = stage.canvas.width * 0.2;
        y = stage.canvas.height * 0.5;
      }
      if (index === 1) {
        x = stage.canvas.width * 0.4;
        y = stage.canvas.height * 0.5;
      }
      if (index === 2) {
        x = stage.canvas.width * 0.6;
        y = stage.canvas.height * 0.5;
      }
      if (index === 3) {
        x = stage.canvas.width * 0.3;
        y = stage.canvas.height * 0.625;
      }
      if (index === 4) {
        x = stage.canvas.width * 0.5;
        y = stage.canvas.height * 0.625;
      }
    }
  }
  if (phone) {
    if (arrayLength === 3) {
      if (index === 0) {
        x = stage.canvas.width * 0.125;
        y = stage.canvas.height * 0.5;
      }
      if (index === 1) {
        x = stage.canvas.width * 0.375;
        y = stage.canvas.height * 0.5;
      }
      if (index === 2) {
        x = stage.canvas.width * 0.625;
        y = stage.canvas.height * 0.5;
      }
    }
    if (arrayLength === 4) {
      if (index === 0) {
        x = stage.canvas.width * 0.125;
        y = stage.canvas.height * 0.5;
      }
      if (index === 1) {
        x = stage.canvas.width * 0.375;
        y = stage.canvas.height * 0.5;
      }
      if (index === 2) {
        x = stage.canvas.width * 0.625;
        y = stage.canvas.height * 0.5;
      }
      if (index === 3) {
        x = stage.canvas.width * 0.375;
        y = stage.canvas.height * 0.6;
      }
    }
    if (arrayLength === 5) {
      if (index === 0) {
        x = stage.canvas.width * 0.125;
        y = stage.canvas.height * 0.5;
      }
      if (index === 1) {
        x = stage.canvas.width * 0.375;
        y = stage.canvas.height * 0.5;
      }
      if (index === 2) {
        x = stage.canvas.width * 0.625;
        y = stage.canvas.height * 0.5;
      }
      if (index === 3) {
        x = stage.canvas.width * 0.25;
        y = stage.canvas.height * 0.6;
      }
      if (index === 4) {
        x = stage.canvas.width * 0.5;
        y = stage.canvas.height * 0.6;
      }
    }
  }
  return {
    x,
    y,
  };
};
export function collision(obj1, obj2) {
  var objBounds1 = obj1.getBounds().clone();
  var objBounds2 = obj2.getBounds().clone();

  var pt = obj1.globalToLocal(objBounds2.x, objBounds2.y);

  var h1 = -(objBounds1.height / 2 + objBounds2.height - objBounds1.height / 2);
  var h2 = objBounds2.height / 2;
  var w1 = -(objBounds1.width / 2 + objBounds2.width - objBounds1.width / 2);
  var w2 = objBounds2.width / 2;
  if (pt.x > w2 || pt.x < w1) {
    return false;
  }
  if (pt.y > h2 || pt.y < h1) {
    return false;
  }
  return true;
}

export const mouseObjCollision = (x, y, obj2) => {
  var objBounds2 = obj2.getBounds().clone();
  if (
    x >= objBounds2.x + objBounds2.width ||
    x <= objBounds2.x ||
    y >= objBounds2.y + objBounds2.height ||
    y <= objBounds2.y
  ) {
    return false;
  }
  return true;
};
