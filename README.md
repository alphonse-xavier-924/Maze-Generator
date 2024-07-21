# Maze Generator with P5.js

This project is a maze generator implemented using the P5.js library. It visualizes the process of creating a maze using a depth-first search algorithm with backtracking.

## What the Code Does

### Variables and Initialization

- `rows`, `cols`: Number of rows and columns in the grid.
- `w`: Size of each cell.
- `grid`: Array to store all the cells.
- `current`: The current cell being processed.
- `stack`: Stack to keep track of the path for backtracking.

The `setup` function initializes the canvas, calculates the number of rows and columns, and creates the grid of cells.

### Draw Loop

The `draw` function is called repeatedly to update the canvas:

1. Sets the background color.
2. Displays all the cells.
3. Marks the current cell as visited and highlights it.
4. Chooses the next cell to move to based on unvisited neighbors.
5. If a next cell is found, it removes the walls between the current cell and the next cell, and then moves to the next cell.
6. If no next cell is found and the stack is not empty, it backtracks to the previous cell.

### Cell Object

Each cell in the grid is an instance of the `Cell` object. It contains:

- `i`, `j`: Position of the cell in the grid.
- `walls`: Array indicating which walls are present (top, right, bottom, left).
- `visited`: Boolean indicating whether the cell has been visited.

Methods:

- `checkNeighbors`: Finds unvisited neighbors of the cell.
- `show`: Displays the cell on the canvas.
- `highlight`: Highlights the current cell.

### Helper Functions

- `index(i, j)`: Returns the index of the cell in the grid array.
- `removeWalls(a, b)`: Removes the walls between two adjacent cells.
