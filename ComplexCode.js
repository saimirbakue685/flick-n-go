/* Filename: ComplexCode.js */

// This code generates a random maze using a randomized Prim's algorithm
// The maze is then solved using the A* search algorithm

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.connections = [];
    this.visited = false;
  }

  addConnection(cell) {
    this.connections.push(cell);
    cell.connections.push(this);
  }
}

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];

    for (let row = 0; row < rows; row++) {
      let rowArr = [];
      for (let col = 0; col < cols; col++) {
        rowArr.push(new Cell(row, col));
      }
      this.grid.push(rowArr);
    }
  }

  generateMaze() {
    let startCell = this.grid[0][0];
    let walls = [startCell];

    while (walls.length > 0) {
      let randomIndex = Math.floor(Math.random() * walls.length);
      let current = walls[randomIndex];
      current.visited = true;

      let neighbors = [];

      if (current.row > 0 && !this.grid[current.row - 1][current.col].visited) {
        neighbors.push(this.grid[current.row - 1][current.col]);
      }
      if (
        current.row < this.rows - 1 &&
        !this.grid[current.row + 1][current.col].visited
      ) {
        neighbors.push(this.grid[current.row + 1][current.col]);
      }
      if (current.col > 0 && !this.grid[current.row][current.col - 1].visited) {
        neighbors.push(this.grid[current.row][current.col - 1]);
      }
      if (
        current.col < this.cols - 1 &&
        !this.grid[current.row][current.col + 1].visited
      ) {
        neighbors.push(this.grid[current.row][current.col + 1]);
      }

      if (neighbors.length > 0) {
        let randomNeighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        current.addConnection(randomNeighbor);
        walls.push(randomNeighbor);
      } else {
        walls.splice(randomIndex, 1);
      }
    }
  }

  solveMaze(startRow, startCol, endRow, endCol) {
    let openSet = [];
    let closedSet = [];

    let startCell = this.grid[startRow][startCol];
    let endCell = this.grid[endRow][endCol];

    openSet.push(startCell);

    while (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      let current = openSet[lowestIndex];

      if (current === endCell) {
        let path = [];
        let temp = current;
        while (temp) {
          path.push(temp);
          temp = temp.previous;
        }
        return path;
      }

      openSet.splice(lowestIndex, 1);
      closedSet.push(current);

      let neighbors = current.connections;

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!closedSet.includes(neighbor)) {
          let tempG = current.g + 1;

          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
            }
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }

          neighbor.h = Maze.heuristic(neighbor, endCell);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }

    return []; // No path found
  }

  static heuristic(a, b) {
    let distanceX = Math.abs(a.row - b.row);
    let distanceY = Math.abs(a.col - b.col);
    return distanceX + distanceY;
  }
}

// Usage example

let maze = new Maze(10, 10);
maze.generateMaze();

let startRow = 0;
let startCol = 0;
let endRow = 9;
let endCol = 9;

let path = maze.solveMaze(startRow, startCol, endRow, endCol);

console.log(`Path from (${startRow},${startCol}) to (${endRow},${endCol}):`);
for (let i = path.length - 1; i >= 0; i--) {
  console.log(`(${path[i].row},${path[i].col})`);
}