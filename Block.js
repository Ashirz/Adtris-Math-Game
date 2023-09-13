class Shape {
  constructor(x, y, size, color, shapeMatrix, value) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.shapeMatrix = shapeMatrix;
    this.width = shapeMatrix[0].length * size;
    this.height = shapeMatrix.length * size;
  this.value = value;
  }

  contains(px, py) {
    return (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + this.height
    );
  }

  display() {
    for (let i = 0; i < this.shapeMatrix.length; i++) {
      for (let j = 0; j < this.shapeMatrix[i].length; j++) {
        if (this.shapeMatrix[i][j] === 1) {
          fill(this.color); // Use the specified color
          rect(
            this.x + j * this.size,
            this.y + i * this.size,
            this.size,
            this.size
          );
        //  value += 1;
        }
      }
    }
  }
}

class Block extends Shape {
  constructor(x, y, size, color, shapeMatrix, value) {
    super(x, y, size, color, shapeMatrix, value);
   //  this.value = 0; // Set the default value to 0
  }
}
  
class Tetromino extends Shape {
  constructor(x, y, size, color, shapeMatrix, value) {
    super(x, y, size, color, shapeMatrix, value);
    // this.value = 0; // Set the default value to 0
  }
}

function generateBlocks() {
  let blockShapes = [
  {
      x: 140,
      y: 100,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 0, 0], [0, 0, 0]],
      value: 1,
    },
    
    {
      x: 190,
      y: 100,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 0], [0, 0, 0]],
      value: 2,
    },
    {
      x: 270,
      y: 100,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 1], [0, 0, 0]],
      value: 3,
    },
    {
      x: 390,
      y: 100,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 1, 1], [0, 0, 0, 0]],
      value: 4,
    },
    ];
    
   for (let shape of blockShapes) {
    blocks.push(
      new Block(
        shape.x,
        shape.y,
        shape.size,
        shape.color,
        shape.shapeMatrix, shape.value
      )
    );
  }
}

function generateTetrominos() {
  let tetrominoShapes = [
    {
      x: 130,
      y: 100,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 1], [0, 0, 1]],
       value: 4,
    },
    {
      x: 240,
      y: 100,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 1], [0, 1, 0]],
      value: 4,
    },
    {
      x: 350,
      y: 100,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[0, 1, 1], [1, 1, 0]],
      value: 4,
    },
    {
      x: 460,
      y: 100,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 0], [1, 1, 0]],
      value: 4,
    },
    {
      x: 140,
      y: 50,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 0, 0], [0, 0, 0]],
      value: 1,
    },
    
    {
      x: 190,
      y: 50,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 0], [0, 0, 0]],
      value: 2,
    },
    {
      x: 270,
      y: 50,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 1], [0, 0, 0]],
      value: 3,
    },
    {
      x: 380,
      y: 50,
      size: 30,
      color: '#FF208F',
      shapeMatrix: [[1, 1, 1, 1], [0, 0, 0, 0]],
      value: 4,
    },
  ];

  for (let shape of tetrominoShapes) {
    tetrominos.push(
      new Tetromino(
        shape.x,
        shape.y,
        shape.size,
        shape.color,
        shape.shapeMatrix, shape.value
      )
    );
  }
}
