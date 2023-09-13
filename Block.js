// Block.js

class Block {
  constructor(x, y, width, color, value) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.color = color;
    this.value = value;
    this.dragging = false;
    this.height = 30; // Fixed height for simplicity
    this.placedOnGrid = false; // To indicate if the block is placed on the grid
  }

  contains(px, py) {
    return px > this.x && px < this.x + this.width && py > this.y && py < this.y + this.height;
  }

  display() {
    fill(this.color);
    if (this.placedOnGrid) {
      noStroke();
      rect(this.x, this.y, this.width, this.height);
    } else {
      rect(this.x, this.y, this.width, this.height);
    }
  }
}
