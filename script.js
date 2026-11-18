const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const cellSize = Math.min(canvas.width / 80, canvas.height / 50);
const gridWidth = cellSize * 80;
const gridHeight = cellSize * 50;
const offsetX = (canvas.width - gridWidth) / 2;
const offsetY = (canvas.height - gridHeight) / 2;
for (let r = 1; r < 51; r++) {
    for (let c = 1; c < 81; c++) {
        console.log(r, c)
        const x = offsetX + (c - 1) * cellSize;
        const y = offsetY + (r - 1) * cellSize;
        ctx.strokeStyle = "#4a4a4aff"
        ctx.strokeRect(x, y, cellSize, cellSize);
    }
}
console.log(canvas.width, canvas.height)
console.log(canvas.clientWidth, canvas.clientHeight)
console.log("Canvas:", canvas.width, canvas.height);
console.log("Display:", canvas.clientWidth, canvas.clientHeight);
console.log("Grid:", cellSize * 80, cellSize * 50);

