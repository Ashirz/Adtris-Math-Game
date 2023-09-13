// Game.js

let blocks = [];
let targetNumber = 0;
let currentSum = 0;
let score = 0;
let level = 1;
let placedBlock = null;
let instructionsScreen;

let blockPlacementSound;
let levelCompletionSound;

let startButton;
let levelSelection;
let level1Button;
let level2Button;
let selectedLevel = null;
let exitButton;



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
  levelSelection = select('#level-selection');
  level1Button = select('#level1-btn');
  level2Button = select('#level2-btn');
  instructionsScreen = select('#instructions-screen');
  startButton = select('#start-btn');
  setupLevelSelection();
  setupInstructionsScreen();
   /* instructionsScreen = select('#instructions-screen');
    instructionsScreen.mousePressed(startGame);*/
    // Hide the canvas initially and show level selection options
   

 // backgroundMusic = loadSound("Sound/awake10_megaWall.mp3");
  // backgroundMusic.play();
  // Start playing background music if it's loaded
 /* if (backgroundMusic.isLoaded()) {
    backgroundMusic.loop();
  }*/
   // Initialize the exit button element
  exitButton = select('#exit-button');
  exitButton.mousePressed(exitLevel);
  }
  
  function exitLevel() {
  levelSelection.show();
   newLevel();
    
}
  function setupLevelSelection() {
  level1Button.mousePressed(() => {
    levelSelection.hide();
    instructionsScreen.show();
    targetNumber = Math.floor(random(11, 40)); // Set target number for level 1
    // Other level-specific properties/settings
  });

  level2Button.mousePressed(() => {
    levelSelection.hide();
    instructionsScreen.show();
    targetNumber = Math.floor(random(41, 70)); // Set target number for level 2
    // Other level-specific properties/settings
  });
}

function setupInstructionsScreen() {
  startButton.mousePressed(() => {
    instructionsScreen.hide();
   // startGame();
  });
}
  
/*function startGame() {
    instructionsScreen.hide();
    // Initialize game components and logic here
}*/
function draw() {
    background(220);
  // Display game components based on the selected level
     if (selectedLevel === 1) {
      // Execute level 1 logic
      setupLevelSelection(); // Call a function that contains level 1 logic
      
    } else if (selectedLevel === 2) {
      // Execute level 2 logic
      setupLevelSelection(); // Call a function that contains level 2 logic
        }
  
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
     
      let gridY = Math.floor((placedBlock.y - 65) / 30);

      // Check if the block is placed within the boundaries of the grid
      if (gridY >= 0 && gridY <= 12 && 
        mouseX >= 15 && mouseX <= 350 &&
        mouseY >= 65 && mouseY <= 485)
       {
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
      alert("Target exceeded, Try again!"); // Alert the player if the sum exceeds the target
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
    alert("Congrats, Target Achieved!"); // Feedback message
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
  text(`Target: ${targetNumber}`, 20, 55);
 text(`Remaining: ${targetNumber-currentSum}`, width - 250, 55);
  text(`Score: ${score}`, width-100, 55);
   text(`A D T R I S : ${selectedLevel}`, width-250,510); 
 }
  

function displayBlocks() {
  for (let block of blocks) {
    block.display();
  }
}


function displayGrid() {
  // Display grid logic
   let cellSize = 30;
  let gridWidth = 360; // Total width of the grid (30*12)
  let gridHeight = 420; // Total height of the grid (30*14)

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
 // targetNumber = Math.floor(random(11, 40)); // Generate a new random target number (1-50)
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
