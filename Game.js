// Game.js

let blocks = [];
let tetrominos = [];
let targetNumber = 0;
let currentSum = 0;
let score = 0;
let level = 1;
let placedBlock = null;
let placedTetro = null;


let instructionsScreen;


//let blockPlacementSound;
//let levelCompletionSound;

let startButton;
let levelSelection;
let level1Button;
let level2Button;
let selectedLevel = null;
let exitButton;



function setup() {
  
   createCanvas(650, 550);
  background(255, 230, 230);
  newLevel();
  levelSelection = select('#level-selection');
  level1Button = select('#level1-btn');
  level2Button = select('#level2-btn');
  instructionsScreen = select('#instructions-screen');
  startButton = select('#start-btn');
  setupLevelSelection();
  setupInstructionsScreen();
   
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
    setupInstructionsScreen();
     console.log(currentSum);
    targetNumber = Math.floor(random(11, 40)); // Set target number for level 1
  //  targetNumber = Math.floor(Math.random() * (40 - 1) + 1);
    // Other level-specific properties/settings
      generateBlocks();
    
  });

  level2Button.mousePressed(() => {
    levelSelection.hide();
    instructionsScreen.show();
    setupInstructionsScreen();
  targetNumber = Math.floor(random(41, 70)); // Set target number for level 2
    // Other level-specific properties/settings
        generateTetrominos();
    
  });
}

function setupInstructionsScreen() {
  startButton.mousePressed(() => {
    instructionsScreen.hide();
   });
}
  

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
 displayTetros();
  displayGrid();
  displayUI();
   
}

function mousePressed() {
  
    // Handle mousePressed logic for blocks
  for (let block of blocks) {
    if (block.contains(mouseX, mouseY)) {
      let blockCopy = new Block(block.x, block.y, block.size, block.color, block.shapeMatrix, block.value);
      blockCopy.dragging = true;
      blocks.push(blockCopy);
      break;
    }
  }

  // Handle mousePressed logic for tetrominos
  for (let tetromino of tetrominos) {
    if (tetromino.contains(mouseX, mouseY)) {
      let tetrominoCopy = new Tetromino(
        tetromino.x,
        tetromino.y,
        tetromino.size,
        tetromino.color,
        tetromino.shapeMatrix,
        tetromino.value
      );
      tetrominoCopy.dragging = true;
      tetrominos.push(tetrominoCopy);
      break;
    }
  }
}
  
function mouseDragged() {
  // Handle mouseDragged logic for blocks
  for (let block of blocks) {
    if (block.dragging) {
      block.x = mouseX;
      block.y = mouseY;
    }
  }
  // Handle mouseDragged logic for tetrominos
  for (let tetromino of tetrominos) {
    if (tetromino.dragging) {
      tetromino.x = mouseX;
      tetromino.y = mouseY;
    }
  }
}

function mouseReleased() {
  // Handle mouseReleased logic for Tetrominos
  let placedTetro = null;

  for (let tetromino of tetrominos) {
    if (tetromino.dragging) {
      tetromino.dragging = false;
      placedTetro = tetromino;
      
      break;
    }
  }

  if (placedTetro !== null) {
    
    // Implement logic to check if the Tetromino can be placed within the grid boundaries
              if (currentSum + placedTetro.value <= targetNumber) {
      // Calculate the grid row index based on the block's y position
     
      let gridY = Math.floor((placedTetro.y - 190) / 30);

      // Check if the block is placed within the boundaries of the grid
      if (gridY >= 0 && gridY <= 10 && 
        mouseX >= 115 && mouseX <= 525 &&
        mouseY >= 190 && mouseY <= 480)
       {
      placedTetro.placedOnGrid = true;
      currentSum += placedTetro.value;
      checkWinCondition(); // You may want to modify this function to handle Tetrominos
    } else {
      // Tetromino cannot be placed within grid boundaries, revert its placement
      placedTetro.placedOnGrid = false;
      alert("Place Tetromino on grid!");
    }
  }else {
      alert("Target exceeded, Try again!"); // Alert the player if the sum exceeds the target
      console.log(placedTetro.value);
      newLevel(); // Start a new level after the alert
    }
  }
  
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
     
      let gridY = Math.floor((placedBlock.y - 190) / 30);

      // Check if the block is placed within the boundaries of the grid
      if (gridY >= 0 && gridY <= 12 && 
        mouseX >= 115 && mouseX <= 525 &&
        mouseY >= 190 && mouseY <= 480)
       {
        // Update sum only if the block is placed within the grid
        placedBlock.placedOnGrid = true;
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
    alert("Congrats, Target Achieved!"); // Feedback message
    newLevel();
  } else if (currentSum > targetNumber) {
    newLevel(); // Start a new level after the alert
  }
}

function displayUI() {
  // Display UI logic
  textSize(16);
  textAlign(LEFT, CENTER);
  fill(0);
   text(`Level : ${selectedLevel} `, 550,160);
 text(`Target: ${targetNumber}`, 550, 200);
//  text(`Math.floor(Math.random() * (40 - 1) + 1`,20,55);
 text(`Remains: ${targetNumber-currentSum}`, 550, 240);
  text(`Score: ${score}`, 550, 280);
  
  text(`ADTRIS`, 50,160);
   
 }
  
function displayGrid() {
  // Display grid logic
   let cellSize = 30;
  let gridWidth = 420; // Total width of the grid (30*14)
  let gridHeight = 300; // Total height of the grid (30*10)

  // Calculate the starting positions to center-align the grid
  let startX = (width - gridWidth) / 2;
 // let startY = (height - gridHeight) / 2;
  let startY = 190;

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
  tetrominos = [];
  currentSum = 0;
 }

/*function displayBlocks() {
  for (let block of blocks) {
    if (!block.placedOnGrid) {
      block.display();
    }
  }
}

function displayTetros() {
  for (let tetromino of tetrominos) {
    if (!tetromino.placedOnGrid) {
      tetromino.display();
    }
  }
}*/

function displayBlocks() {
  for (let block of blocks) {
    block.display();
  }
}

function displayTetros() {
  for (let tetromino of tetrominos) {
    tetromino.display();
  }
}


/*function generateTetrominos() {
  tetrominos = []; // Clear existing tetrominos

  const tetrominoShapes = [
    {
      shape: 'L-shape',
      color: '#FF5733',
      blocks: [
        new Tetromino(0, 0, 'L-shape', '#FF5733'),
        new Tetromino(0, 1, 'L-shape', '#FF5733'),
        new Tetromino(0, 2, 'L-shape', '#FF5733'),
        new Tetromino(1, 2, 'L-shape', '#FF5733'),
      ],
    },
    {
      shape: 'T-shape',
      color: '#33FF5E',
      blocks: [
        new Tetromino(0, 0, 'T-shape', '#33FF5E'),
        new Tetromino(-1, 1, 'T-shape', '#33FF5E'),
        new Tetromino(0, 1, 'T-shape', '#33FF5E'),
        new Tetromino(1, 1, 'T-shape', '#33FF5E'),
      ],
    },
    {
      shape: 'square',
      color: '#3391FF',
      blocks: [
        new Tetromino(0, 0, 'square', '#3391FF'),
        new Tetromino(1, 0, 'square', '#3391FF'),
        new Tetromino(0, 1, 'square', '#3391FF'),
        new Tetromino(1, 1, 'square', '#3391FF'),
      ],
    },
    // Add more tetromino shapes as needed
  ];

  const startX = 100; // Starting x position for tetrominos
  const startY = 100; // Starting y position for tetrominos

  for (const shapeData of tetrominoShapes) {
    const tetromino = new Tetromino(shapeData.shape, shapeData.color);
    tetromino.blocks = shapeData.blocks; // Set the blocks for the tetromino
    for (const block of shapeData.blocks) {
      block.x += startX;
      block.y += startY;
    }
    tetrominos.push(tetromino); // Add the tetromino to the array
  }
}*/


/*function generateTetrominos() {
  tetrominos = []; // Clear existing tetrominos

  const tetrominoShapes = [
    {
      shape: 'L-shape',
      color: '#FF5733',
      blocks: [
      new Tetromino(4, 0, '#FF5733'),
        new Tetromino(4, 1, '#FF5733'),
        new Tetromino(4, 2, '#FF5733'),
        new Tetromino(5, 2, '#FF5733'),
            ],
    }, 
    {
      shape: 'T-shape',
      color: '#33FF5E',
      blocks: [
         new Tetromino(4, 0, '#33FF5E'),
        new Tetromino(3, 1, '#33FF5E'),
        new Tetromino(4, 1, '#33FF5E'),
        new Tetromino(5, 1, '#33FF5E'),
      ],
    },
    {
      shape: 'square',
      color: '#3391FF',
      blocks: [
        new Tetromino(4, 0, '#3391FF'),
        new Tetromino(5, 0, '#3391FF'),
        new Tetromino(4, 1, '#3391FF'),
        new Tetromino(5, 1, '#3391FF'),
      ],
    },
    // Add more tetromino shapes as needed
  ];
  
  const startX = 100; // Starting x position for tetrominos
  const startY = 100; // Starting y position for tetrominos

  for (const shapeData of tetrominoShapes) {
    const tetromino = new Tetromino(shapeData.shape, shapeData.color);
    for (const block of shapeData.blocks) {
      block.x += startX;
      block.y += startY;
    }
    tetromino.blocks = shapeData.blocks; // Set the blocks for the tetromino
   // tetrominos.push(tetromino); // Add the tetromino to the array
    tetrominos.push(new Tetromino('L-shape', '#FF5733'));
    tetrominos.push(new Tetromino('T-shape', '#33FF5E'));
    tetrominos.push(new Tetromino('square', '#3391FF'));
  }
}*/
