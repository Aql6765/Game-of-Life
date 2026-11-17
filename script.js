const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
ctx.fillStyle = "#93dd1dff"
ctx.fillRect(300, 200, 70, 70);
console.log(canvas.width, canvas.height);
console.log(canvas.clientWidth, canvas.clientHeight);