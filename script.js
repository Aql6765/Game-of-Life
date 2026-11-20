const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const smallButton = document.querySelector(".simSizeSmall");
const mediumButton = document.querySelector(".simSizeMedium");
const largeButton = document.querySelector(".simSizeLarge");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let grid = [];
let columns = 80;
let rows = 50;
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
createGrid();
drawGrid();
smallButton.addEventListener("click", () => {
    columns = 40;
    rows = 25;
    createGrid();
    drawGrid();
});
mediumButton.addEventListener("click", () => {
    columns = 80;
    rows = 50;
    createGrid();
    drawGrid();
});
largeButton.addEventListener("click", () => {
    columns = 120;
    rows = 75;
    createGrid();
    drawGrid();
});
canvas.addEventListener("click", (event) => {
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
    grid[row - 1][column - 1] = !grid[row - 1][column - 1];
    console.log(column, row);
    console.log(grid[row - 1][column - 1]);
    drawGrid();
})
