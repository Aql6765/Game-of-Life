const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const smallButton = document.querySelector(".simSizeSmall");
const mediumButton = document.querySelector(".simSizeMedium");
const largeButton = document.querySelector(".simSizeLarge");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let columns = 80;
let rows = 50;
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const cellSize = Math.min(canvas.width / columns, canvas.height / rows);
    const gridWidth = cellSize * columns;
    const gridHeight = cellSize * rows;
    const offsetX = (canvas.width - gridWidth) / 2;
    const offsetY = (canvas.height - gridHeight) / 2;
    for (let r = 1; r < rows + 1; r++) {
        for (let c = 1; c < columns + 1; c++) {
            console.log(r, c)
            const x = offsetX + (c - 1) * cellSize;
            const y = offsetY + (r - 1) * cellSize;
            ctx.strokeStyle = "#4a4a4aff"
            ctx.strokeRect(x, y, cellSize, cellSize);
        }
    }
}
drawGrid();
smallButton.addEventListener("click", () => {
    columns = 40;
    rows = 25;
    drawGrid();
});
mediumButton.addEventListener("click", () => {
    columns = 80;
    rows = 50;
    drawGrid();
});
largeButton.addEventListener("click", () => {
    columns = 120;
    rows = 75;
    drawGrid();
});
console.log(canvas.width, canvas.height)
console.log(canvas.clientWidth, canvas.clientHeight)
console.log("Canvas:", canvas.width, canvas.height);
console.log("Display:", canvas.clientWidth, canvas.clientHeight);
console.log("Grid:", cellSize * 80, cellSize * 50);
