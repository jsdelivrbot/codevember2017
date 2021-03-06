'use strict';

// Init
var canvas = document.querySelector('#galaxy');
var ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

var deathstar = {
  image: new Image(),
  laser: 0,
  x: innerWidth + 100,
  y: innerHeight / 2 - 150,
  update: function update() {
    this.x = this.x - 1;
    this.laser--;
  },
  draw: function draw() {
    if (this.laser > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#FFF';
      ctx.shadowColor = '#00960a';
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 20;
      ctx.moveTo(deathstar.x + 85, deathstar.y + 75);
      ctx.lineTo(0, deathstar.y + 75);
      ctx.stroke();
      ctx.restore();
    }
  }
};
deathstar.image.src = 'https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/death-star-256x256.png';

// Fix resize canvas
window.onresize = function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

function clearScreen() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var stars = [];
for (var i = 0; i < 500; i++) {
  // star(x, y, speed)
  stars.push({
    x: ~ ~(Math.random() * canvas.width),
    y: ~ ~(Math.random() * canvas.height),
    speed: ~ ~(1 + Math.random() * 5),
    color: ~ ~(Math.random() * 3)
  });
}

// Main loop
function loop() {
  requestAnimationFrame(loop, canvas);
  update();
  render();
}

// Update
function update() {

  // Stars
  for (var i = 0; i < 500; i++) {
    stars[i].x -= stars[i].speed;
    if (stars[i].x < 0) stars[i].x = canvas.width;
  }

  deathstar.update();
}

// Render
function render() {

  clearScreen();
  for (var i = 0; i < 500; i++) {
    var s = stars[i];
    ctx.lineWidth = 1;
    ctx.strokeStyle = ['#444', '#888', '#FFF'][stars[i].color];
    ctx.strokeRect(s.x, s.y, 1, 1);
  }

  if (~ ~(Math.random() * 250) == 1) deathstar.laser = 15 + ~ ~(Math.random() * 25);

  // DeathStar
  ctx.drawImage(deathstar.image, deathstar.x, deathstar.y);
  // laser
  deathstar.draw();
}

loop();
var music = new Audio('https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/imperial-8bit-by-crig.mp3');
music.play();