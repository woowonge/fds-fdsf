const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  context.strokeStyle = document.querySelector("#color-picker").value;
  context.lineWidth = document.querySelector("#thickness").value;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (context.lineWidth >= 50 || context.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    context.lineWidth++;
  } else {
    context.lineWidth--;
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

document.querySelector("#clear").addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

document.querySelector("#eraser").addEventListener("click", () => {
  context.strokeStyle = "#FFFFFF";
  context.lineWidth = 20;
});
document.querySelector("#save").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
