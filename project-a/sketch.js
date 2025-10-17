let x;
let y;
let circleSize1;
let circleSize2;
let circleSize3;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
   x = 0;
  y = 0;
  circleSize1 =40;
  circleSize2 =40;
  circleSize3 =40;
 // noLoop();
}

function draw() {
  background(20, 50, 95);
  noStroke();
  fill(255);
  
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  if (d < 100 / 2) {
    circleSize1 = circleSize1 + 1;
  } else {
    if (circleSize1 > 40) {
      circleSize1 = circleSize1 - 1;
    }
  }

  d = dist(mouseX, mouseY, width / 2+100, height / 2+150);
  if (d < 100 / 2) {
    circleSize2 = circleSize2 + 1;
  } else {
    if (circleSize2 > 40) {
      circleSize2 = circleSize2 - 1;
    }
  }
   d = dist(mouseX, mouseY, width / 2-150, height / 2+100);
  if (d < 100 / 2) {
    circleSize3 = circleSize3 + 1;
  } else {
    if (circleSize3 > 40) {
      circleSize3 = circleSize3 - 1;
    }
  }
  drawCreature(width / 2, height / 2, circleSize1);
  drawCreature(width / 2 + 100, height / 2 + 150, circleSize2);
  drawCreature(width / 2 - 150, height / 2 + 100, circleSize3);

  let starCount = 200;

  for (let i = 0; i < starCount; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(1, 3); //tiny dots
    circle(x, y, d);

  }
}
function drawCreature(cx, cy, size) {
  push();

  translate(cx, cy);
//move
  let v = 2 * sin(frameCount * 0.1);
  // Sprite A
  noStroke();
  let d = dist(mouseX, mouseY, cx, cy);
  if (d < 100 / 2) {
    fill(0, 128, 128);
        //circleSize = circleSize + 1;
  } else {
    fill(30);
    stroke(20);
  }
  //moving like bouncy
  translate(0, 20 * sin(frameCount * 0.1));
  circle(0 - v, 0 + v, size);
  // x axis move side to side, y axis move up and down;
  line(0 + 14 - v, 0 + v, 0 + 32 - v, 0 + v);
  line(0 + 12 - v, 0 + 7 + v, 0 + 28 - v, 0 + 16 + v);
  line(0 + 10 - v, 0 + 10 + v, 0 + 23 - v, 0 + 23 + v);
  line(0 + 7 - v, 0 + 12 + v, 0 + 16 - v, 0 + 28 + v);
  line(0 - v, 0 + 14 + v, 0 - v, 0 + 32 + v);
  line(0 - 7 - v, 0 + 12 + v, 0 - 16 - v, 0 + 28 + v);
  line(0 - 10 - v, 0 + 10 + v, 0 - 23 - v, 0 + 23 + v);
  line(0 - 12 - v, 0 + 7 + v, 0 - 28 - v, 0 + 16 + v);
  line(0 - 14 - v, 0 + v, 0 - 32 - v, 0 + v);
  line(0 - 12 - v, 0 - 7 + v, 0 - 28 - v, 0 - 16 + v);
  line(0 - 10 - v, 0 - 10 + v, 0 - 23 - v, 0 - 23 + v);
  line(0 - 7 - v, 0 - 12 + v, 0 - 16 - v, 0 - 28 + v);
  line(0 - v, 0 - 14 + v, 0 - v, 0 - 32 + v);
  line(0 + 7 - v, 0 - 12 + v, 0 + 16 - v, 0 - 28 + v);
  line(0 + 10 - v, 0 - 10 + v, 0 + 23 - v, 0 - 23 + v);
  line(0 + 12 - v, 0 - 7 + v, 0 + 28 - v, 0 - 16 + v);

  // eyes (A)
  noStroke();

  fill(255); // whites
  circle(0 - 7 + v, 0 - 5 + v, 13);
  circle(0 + 9 + v, 0 - 5 + v, 13);
  fill(20); // pupils
  circle(x - 7 + v, y + 0 - 4 + v, 6);
  circle(x + 6 + v, y + 0 - 4 + v, 6);
  // circle(x, height/2, 50);
  x = mouseX * 0.01 - 2;
  y = mouseY * 0.01 - 2;
  pop();
}
