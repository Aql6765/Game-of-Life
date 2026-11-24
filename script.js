const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const smallButton = document.querySelector(".simSizeSmall");
const mediumButton = document.querySelector(".simSizeMedium");
const largeButton = document.querySelector(".simSizeLarge");
const clearButton = document.querySelector(".clearButton");
const randomButton = document.querySelector(".randomButton");
const startButton = document.querySelector(".startButton");
const stepButton = document.querySelector(".stepButton");
const stopButton = document.querySelector(".stopButton");
const speedSlider = document.querySelector(".speedSlider");
const genNumText = document.getElementById("genNum");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let visitedCells = new Set();
let isDrawing = false;
let grid = [];
let columns = 80;
let rows = 50;
let lastRow = null;
let lastColumn = null;
let gridSize = "medium";
let generation = 0;
let simRunning = false;
let simInterval;
function createGrid() {
    grid = [];
    for (let r = 1; r <= rows; r++) {
        let row = [];
        for (let c = 1; c < columns + 1; c++) {
            row.push(false);
        }
        grid.push(row);
    }
}
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let r = 1; r < rows + 1; r++) {
        for (let c = 1; c < columns + 1; c++) {
            const cellSize = Math.min(canvas.width / columns, canvas.height / rows);
            const gridWidth = cellSize * columns;
            const gridHeight = cellSize * rows;
            const offsetX = (canvas.width - gridWidth) / 2;
            const offsetY = (canvas.height - gridHeight) / 2;
            const x = offsetX + (c - 1) * cellSize;
            const y = offsetY + (r - 1) * cellSize;
            if (grid[r - 1][c - 1]) {
                ctx.fillStyle = "#93dd1d"
                ctx.fillRect(x, y, cellSize, cellSize);
            }
            ctx.strokeStyle = "#4a4a4a"
            ctx.strokeRect(x, y, cellSize, cellSize);
        }
    }
}
function paintCell(event) {
    const cellSize = Math.min(canvas.width / columns, canvas.height / rows);
    const gridWidth = cellSize * columns;
    const gridHeight = cellSize * rows;
    const offsetX = (canvas.width - gridWidth) / 2;
    const offsetY = (canvas.height - gridHeight) / 2;
    const column = Math.floor((event.offsetX - offsetX) / cellSize) + 1;
    const row = Math.floor((event.offsetY - offsetY) / cellSize) + 1;
    if (column < 1 || column > columns || row < 1 || row > rows) {
        return;
    }
    if (lastRow === null || lastColumn === null) {
        drawLine(column, row, column, row);
    } else {
        drawLine(lastColumn, lastRow, column, row);
    }
    lastColumn = column;
    lastRow = row;
    drawGrid();
}
function drawLine(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    let e2;
    while (true) {
        const cellKey = `${y1},${x1}`;
        if (!visitedCells.has(cellKey)) {
            visitedCells.add(cellKey);
            grid[y1 - 1][x1 - 1] = !grid[y1 - 1][x1 - 1]
        }
        if (x1 === x2 && y1 === y2) {
            break;
        };
        e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        };
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        };
    }
}
function countNeighbors(row, column) {
    let aliveNeighbors = 0;
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) {
                continue;
            }
            const neighborRow = row + r;
            const neighborColumn = column + c;
            if (neighborRow >= 0 && neighborRow < rows && neighborColumn >= 0 && neighborColumn < columns) {
                if (grid[neighborRow][neighborColumn] === true) {
                    aliveNeighbors += 1
                }
            }
        }
    }
    return aliveNeighbors
}
function calculateNextGen(row, column) {
    const isAlive = grid[row][column];
    const aliveNeighbors = countNeighbors(row, column);
    if (isAlive && aliveNeighbors < 2) {
        return false;
    }
    else if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
        return true;
    }
    else if (isAlive && aliveNeighbors > 3) {
        return false;
    }
    else if (!isAlive && aliveNeighbors === 3) {
        return true;
    }
}
function createNextGrid() {
    let nextGrid = [];
    for (let r = 0; r < rows; r++) {
        nextGrid[r] = [];
        for (let c = 0; c < columns; c++) {
            nextGrid[r][c] = calculateNextGen(r, c);
        }
    }
    grid = nextGrid;
    drawGrid();
}
function randomGrid() {
    createGrid();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            grid[r][c] = Math.round(Math.random()) === 1 ? true : false;
        }
    }
}
createGrid();
drawGrid();
smallButton.addEventListener("click", () => {
    columns = 40;
    rows = 25;
    gridSize = "small";
    simRunning = false;
    clearInterval(simInterval);
    createGrid();
    drawGrid();
    generation = 0;
    genNumText.textContent = generation;
});
mediumButton.addEventListener("click", () => {
    columns = 80;
    rows = 50;
    gridSize = "medium";
    simRunning = false;
    clearInterval(simInterval);
    createGrid();
    drawGrid();
    generation = 0;
    genNumText.textContent = generation;
});
largeButton.addEventListener("click", () => {
    columns = 120;
    rows = 75;
    gridSize = "large";
    simRunning = false;
    clearInterval(simInterval);
    createGrid();
    drawGrid();
    generation = 0;
    genNumText.textContent = generation;
});
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    visitedCells.clear();
    lastRow = null;
    lastColumn = null;
    paintCell(event);
})
window.addEventListener("mouseup", () => {
    isDrawing = false;
    lastRow = null;
    lastColumn = null;
})
canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        paintCell(event);
    }
})
clearButton.addEventListener("click", () => {
    if (gridSize === "small") {
        columns = 40;
        rows = 25;
        gridSize = "small";
        createGrid();
        drawGrid();
        simRunning = false;
        clearInterval(simInterval);
    }
    if (gridSize === "medium") {
        columns = 80;
        rows = 50;
        gridSize = "medium";
        createGrid();
        drawGrid();
        simRunning = false;
        clearInterval(simInterval);
    }
    if (gridSize === "large") {
        columns = 120;
        rows = 75;
        gridSize = "large";
        createGrid();
        drawGrid();
        simRunning = false;
        clearInterval(simInterval);
    }
    generation = 0;
    genNumText.textContent = generation;
})
randomButton.addEventListener("click", () => {
    if (simRunning === false) {
        randomGrid();
        drawGrid();
        document.getElementById("genNum").textContent = 0;
    }
    else if (simRunning === true) {
        simRunning = false;
        clearInterval(simInterval);
        randomGrid();
        drawGrid();
        document.getElementById("genNum").textContent = 0;
    }
})
speedSlider.addEventListener("input", () => {
    const interval = 510 - speedSlider.value;
    if (simRunning === true) {
        clearInterval(simInterval);
        simInterval = setInterval(() => {
            createNextGrid();
            generation += 1;
            genNumText.textContent = generation;
        }, interval);
    }
})
startButton.addEventListener("click", () => {
    const interval = 510 - speedSlider.value;
    if (simRunning === false) {
        simRunning = true;
        simInterval = setInterval(() => {
            createNextGrid();
            generation += 1;
            genNumText.textContent = generation;
        }, interval);
    }
    else {
        return;
    }
})
stepButton.addEventListener("click", () => {
    createNextGrid();
    generation += 1;
    genNumText.textContent = generation;
});
stopButton.addEventListener("click", () => {
    if (simRunning === true) {
        simRunning = false;
        clearInterval(simInterval);
    }
    else {
        return;
    }
})
