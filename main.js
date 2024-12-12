// determines if it's player 1 turn or not
var is_p1Turn = true;

// Get all grid elements
const elements = document.querySelectorAll('.grid');
const btn = document.getElementsByClassName('restart');
const board = document.querySelector('.container');

// Initialize a 3x3 grid to track the game state
let gridState = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

// Function to check victory conditions
function checkVictory(grid) {
  const winningCombos = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      grid[a[0]][a[1]] !== " " &&
      grid[a[0]][a[1]] === grid[b[0]][b[1]] &&
      grid[a[0]][a[1]] === grid[c[0]][c[1]]
    ) {
      return grid[a[0]][a[1]]; // Return the winner ("X" or "O")
    }
  }

  return null; // No winner yet
}

// Function to check for a draw
function checkDraw(grid) {
  for (let row of grid) {
    if (row.includes(" ")) {
      return false; // Still has empty spaces
    }
  }
  return true; // No empty spaces left
}

// Add click event listeners to each grid element
elements.forEach((grid, index) => {
  grid.addEventListener('click', () => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Only update if the cell is empty
    if (gridState[row][col] === " ") {
      gridState[row][col] = is_p1Turn ? 'X' : 'O';
      grid.textContent = gridState[row][col];

      // Check for a winner or a draw
      const winner = checkVictory(gridState);
      if (winner) {
        document.getElementById("button").style.display = "block";
        board.classList.add('no-event');
      } else if (checkDraw(gridState)) {
        document.getElementById("button").style.display = "block";
        board.classList.add('no-event');
      }

      // Switch turns
      is_p1Turn = !is_p1Turn;
    }
  });
});

// Function to reset the game
function resetGame() {
  document.getElementById("button").style.display = "none"; //hides the restart button
  board.classList.remove('no-event');

  gridState = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];

  elements.forEach(grid => {
    grid.textContent = " ";
  });

  is_p1Turn = true;
}




