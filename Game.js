// Game.js
//import Block from './Block.js';



let blocks = [];
let targetNumber = 0;
let currentSum = 0;
let score = 0;
let level = 1;
let placedBlock = null;
//let backgroundMusic;
let instructionsScreen;

let blockPlacementSound;
let levelCompletionSound;

// Load sound files
/*function preload() {
    blockPlacementSound = loadSound('..Sound/block_placement.mp3');
   // levelCompletionSound = loadSound('path_to_your_sound_files/level_completion.mp3');
}*/


/*function preload() {
   console.log('Preloading sound files...');
  
}*/


function setup() {
  createCanvas(400, 550);
  background(255, 230, 230);
  newLevel();
  instructionsScreen = select('#instructions-screen');
    instructionsScreen.mousePressed(startGame);
 // backgroundMusic = loadSound("Sound/awake10_megaWall.mp3");
  // backgroundMusic.play();
  // Start playing background music if it's loaded
 /* if (backgroundMusic.isLoaded()) {
    backgroundMusic.loop();
  }*/
  
  }
function startGame() {
    instructionsScreen.hide();
    // Initialize game components and logic here
}
function draw() {
  background(220);
  displayBlocks();
  displayGrid();
  displayUI();
 
  // Check if background music is playing, and if not, play it
 /* if (!backgroundMusic.isPlaying() && backgroundMusic.isLoaded()) {
    backgroundMusic.loop();
  }*/
  
}



function mousePressed() {
  
  // Handle mousePressed logic
  for (let block of blocks) {
    if (block.contains(mouseX, mouseY)) {
      let blockCopy = new Block(block.x, block.y, block.width, block.color, block.value);
      blockCopy.dragging = true;
      blocks.push(blockCopy);
      
      break;
    }
  }
}

function mouseDragged() {
  // Handle mouseDragged logic
  for (let block of blocks) {
    if (block.dragging) {
      block.x = mouseX;
      block.y = mouseY;
    }
  }
}

function mouseReleased() {
  // Handle mouseReleased logic
   let placedBlock = null;

  for (let block of blocks) {
    if (block.dragging) {
      block.dragging = false;
      placedBlock = block;
      break;
    }
  }

  if (placedBlock !== null) {
    if (currentSum + placedBlock.value <= targetNumber) {
      // Calculate the grid row index based on the block's y position
      let gridY = Math.floor((placedBlock.y - 100) / 30);

      // Check if the block is placed within the boundaries of the grid
      if (
        gridY >= 0 && gridY <= 12 &&
        mouseX >= 10 && mouseX <= 370 &&
        mouseY >= 100 && mouseY <= 490
      ) {
        // Update sum only if the block is placed within the grid
        placedBlock.placedOnGrid = true;
       // blockPlacementSound.play(); // Play sound effect
        currentSum += placedBlock.value;
        checkWinCondition();
      } else {
        // Block not placed within grid boundaries, revert its placement
        placedBlock.placedOnGrid = false;
        alert("Place block on grid!");
      }
    } else {
      //let exceededAmount = (currentSum + placedBlockCopy.value) - targetNumber;
      //alert("Exceeded target by ${exceededAmount}!");
     alert("Exceeded target!"); // Alert the player if the sum exceeds the target
      newLevel(); // Start a new level after the alert
    }
  }
}

function checkWinCondition() {
  // Handle checkWinCondition logic
  if (currentSum === targetNumber) {
    score++;
    level++;
    // levelCompletionSound.play(); // Play sound effect
    alert("Good job!"); // Feedback message
    newLevel();
  } else if (currentSum > targetNumber) {
   // showCustomAlert(); // Display the alert when target sum is exceeded
    newLevel(); // Start a new level after the alert
  }
}

function displayUI() {
  // Display UI logic
  textSize(16);
  textAlign(LEFT, CENTER);
  fill(0);
  text(`Target: ${targetNumber}`, 10, 60);
 // text(`Sum: ${currentSum}`, width - 100, 60);
  text(`Score: ${score}`, width-100, 60);
}

function displayBlocks() {
  for (let block of blocks) {
    block.display();
  }
}


function displayGrid() {
  // Display grid logic
   let cellSize = 30;
  let gridWidth = 360; // Total width of the grid
  let gridHeight = 400; // Total height of the grid

  // Calculate the starting positions to center-align the grid
  let startX = (width - gridWidth) / 2;
  let startY = (height - gridHeight) / 2;

  for (let x = startX; x < startX + gridWidth; x += cellSize) {
    for (let y = startY; y < startY + gridHeight; y += cellSize) {
      stroke(0);
      noFill();
      rect(x, y, cellSize, cellSize);
    }
  }
}

function newLevel() {
  // Generate a new level logic
   blocks = [];
  currentSum = 0;
  targetNumber = Math.floor(random(1, 51)); // Generate a new random target number (1-50)
  generateBlocks(targetNumber);
}

function generateBlocks(target) {
  blocks = [];
  let blockSizes = [1, 2, 3, 4];
 
  let colors = ['#FF5733', '#33FF5E', '#3391FF', '#E433FF'];
  
  let totalBlockWidth = blockSizes.reduce((total, size) => total + size * 30 + 5, -5); // Calculate the total width of all blocks
  
  // Calculate the starting x position to center-align the blocks
  let startX = (width - totalBlockWidth) / 2;
  let y = 10;
  
  for (let size of blockSizes) {
    let value = size;
    let blockWidth = size * 30; // Fixed width for simplicity
    let colorIndex = size - 1;
    blocks.push(new Block(startX, y, blockWidth, colors[colorIndex], value));
    startX += blockWidth + 5;
  }
}

/* Example JavaScript for Sound */
// Load sound files
/*let backgroundMusic = new Audio('Sound/awake10_megaWall.mp3');
//let blockPlacedSound = new Audio('block_placed.mp3');
//let levelWinSound = new Audio('level_win.mp3');

// Play sound effects
blockPlacedSound.play();
levelWinSound.play();

// Toggle background music
document.getElementById('music-toggle').addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
});*/



// Export the necessary functions for p5.js
//export { setup, draw, mousePressed, mouseDragged, mouseReleased };
