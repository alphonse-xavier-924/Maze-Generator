let rows, cols;
let w = 10;
let grid = [];
let current;
let stack = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = new Cell(x, y);
      grid.push(cell);
    }
  }
  frameRate(5);

  current = grid[0];
}




function draw() {
  background(51);

  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  var next = current.checkNeighbors();
  if(next) {
    next.visited = true;

    stack.push(current);
    removeWalls(current, next);

    current = next;
  } else if(stack.length > 0){
    current = stack.pop()
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i >= cols || j >= rows) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  var x = a.i - b.i;

  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function () {
    var neighbors = [];

    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };

  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);

    if (this.walls[0]) {
      line(x, y, x + w, y); // top
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w); // right
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w); // bottom
    }
    if (this.walls[3]) {
      line(x, y + w, x, y); // left
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  };

  this.highlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  };
}