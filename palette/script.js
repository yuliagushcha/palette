const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 512, 512);

let paintBucket = 'none';
let currentColor = 'none';
let pencil = 'none';
let isDrawing = false;
let lastX = 0;
let lastY = 0;
const colors = [];

const chooseColor = document.querySelector('#colorWell');
const chooseBucketValue = document.querySelector('.bucket');
const choosePencil = document.querySelector('.pencil');

const curr = document.querySelector(".current");

chooseBucketValue.addEventListener('click', () => {
  chooseColor.classList.remove('highlightItem');
  choosePencil.classList.remove('highlightItem');
  chooseBucketValue.classList.add('highlightItem');
  paintBucket = 'bucket';
  currentColor = 'none';
  pencil = 'none';
});

chooseColor.addEventListener('click', () => {
  chooseColor.classList.add('highlightItem');
  choosePencil.classList.remove('highlightItem');
  chooseBucketValue.classList.remove('highlightItem');
  currentColor = 'chooseColor';
  pencil = 'none';
  paintBucket = 'none';
});

choosePencil.addEventListener('click', () => {
  chooseColor.classList.remove('highlightItem');
  choosePencil.classList.add('highlightItem');
  chooseBucketValue.classList.remove('highlightItem');
  pencil = 'pencil';
  currentColor = 'none';
  paintBucket = 'none';
});

const colorValue = document.querySelector('.current');
const colorPreviousValue = document.querySelector('.previous');

document.addEventListener('click', () => {
  if (paintBucket === 'bucket') {
    canvas.addEventListener('click', () => {
      const newColor = getComputedStyle(colorValue).backgroundColor;
      ctx.fillStyle = newColor;
      ctx.fillRect(0, 0, 512, 512);
    });
  }

  if (currentColor === 'chooseColor') {
    chooseColor.addEventListener("input", updateFirst, false);
    chooseColor.addEventListener("change", updateAll, false);
    chooseColor.select();
  
    function updateFirst(event) {
      if (curr) {
        curr.style.backgroundColor = event.target.value;
      }
    }
  
    function updateAll(event) {
      document.querySelectorAll(".current").forEach(function(curr) {
        curr.style.backgroundColor = event.target.value;
      });
    }
  
    const newCol = getComputedStyle(curr).backgroundColor;
      colors.unshift(newCol);
      if (colors.length === 4) {
        colors.pop(newCol);
      }
      if (colors.length === 2) {
      } else if (colors.length === 3) {
        colorPreviousValue.style.backgroundColor = colors[1];
      }   
  }

  if (pencil === 'pencil') {
    ctx.strokeStyle = colorValue.style.backgroundColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 10;
    ctx.lineHeight = 10;

    function draw(e) {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
  }
});