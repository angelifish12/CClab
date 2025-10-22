let x;
let y;
let circleSize1;
let circleSize2;
let circleSize3;
let lineWidth1 = 0;
let lineWidth2 = 0;
let lineWidth3 = 0;
let eyeSize1 = 6;
let eyeSize2 = 6;
let eyeSize3 = 6;
let eyeSizeW1 = 13;
let eyeSizeW2 = 13;
let eyeSizeW3 = 13;
let speed = 1;
let blocking = false;
let spaceMode = false;

function mouseInCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  x = 0;
  y = 0;
  circleSize1 = 40;
  circleSize2 = 40;
  circleSize3 = 40;
}

function draw() {
  if (spaceMode == false) {
    background(random(12, 32), random(45, 65), random(85, 105));
  }

  noStroke();
  fill(255);

  let d = dist(mouseX, mouseY, width / 2, height / 2);
  if (d < 100 / 2) {
    circleSize1 = circleSize1 + speed;
    lineWidth1 = lineWidth1 + speed;
  } else {
    if (circleSize1 > 40) {
      circleSize1 = circleSize1 - speed;
      lineWidth1 = lineWidth1 - speed;
    }
  }

  d = dist(mouseX, mouseY, width / 2 + 100, height / 2 + 150);
  if (d < 100 / 2) {
    circleSize2 = circleSize2 + speed;
    lineWidth2 = lineWidth2 + speed;
  } else {
    if (circleSize2 > 40) {
      circleSize2 = circleSize2 - speed;
      lineWidth2 = lineWidth2 - speed;
    }
  }

  d = dist(mouseX, mouseY, width / 2 - 150, height / 2 + 100);
  if (d < 100 / 2) {
    circleSize3 = circleSize3 + 1;
    lineWidth3 = lineWidth3 + 1;
  } else {
    if (circleSize3 > 40) {
      circleSize3 = circleSize3 - 1;
      lineWidth3 = lineWidth3 - 1;
    }
  }

  // stars
  let starCount = 200;
  for (let i = 0; i < starCount; i++) {
    let sx = random(width);
    let sy = random(height);
    let sd = random(1, 3); // tiny dots
    circle(sx, sy, sd);
  }

  if (mouseIsPressed) {
    // flashlight
    fill(255, 220, 100, 220);
    ellipse(mouseX, mouseY, 50, 50);
    fill(255, 245, 170, 100);
    triangle(mouseX, mouseY - 25, mouseX, mouseY + 25, mouseX - 360, mouseY);
  } else {
    drawCreature(
      width / 2,
      height / 2,
      circleSize1,
      lineWidth1,
      eyeSize1,
      eyeSizeW1
    );
    drawCreature(
      width / 2 + 100,
      height / 2 + 150,
      circleSize2,
      lineWidth2,
      eyeSize2,
      eyeSizeW2
    );
    drawCreature(
      width / 2 - 150,
      height / 2 + 100,
      circleSize3,
      lineWidth3,
      eyeSize3,
      eyeSizeW3
    );
  }
}

function drawCreature(cx, cy, size, lineWidth, eyeSize, eyeSizeW) {
  push();

  translate(cx, cy);
  let v = 2 * sin(frameCount * 0.1);

  noStroke();
  let d = dist(mouseX, mouseY, cx, cy);
  if (d < 100 / 2) {
    fill(0, 128, 128);
  } else {
    fill(30);
    stroke(20);
  }

  translate(0, 20 * sin(frameCount * 0.1));
  if (mouseInCanvas()) {
    push();
    fill(30);
    stroke(20);
    line(0 + 14 - v, 0 + v, 0 + 32 - v + lineWidth, 0 + v);
    line(0 + 12 - v, 0 + 7 + v, 0 + 28 - v + lineWidth, 0 + 16 + v + lineWidth);
    line(
      0 + 10 - v,
      0 + 10 + v,
      0 + 23 - v + lineWidth,
      0 + 23 + v + lineWidth
    );
    line(0 + 7 - v, 0 + 12 + v, 0 + 16 - v + lineWidth, 0 + 28 + v + lineWidth);
    line(0 - v, 0 + 14 + v, 0 - v, 0 + 32 + v + lineWidth);
    line(0 - 7 - v, 0 + 12 + v, 0 - 16 - v - lineWidth, 0 + 28 + v + lineWidth);
    line(
      0 - 10 - v,
      0 + 10 + v,
      0 - 23 - v - lineWidth,
      0 + 23 + v + lineWidth
    );
    line(0 - 12 - v, 0 + 7 + v, 0 - 28 - v - lineWidth, 0 + 16 + v + lineWidth);
    line(0 - 14 - v, 0 + v, 0 - 32 - v - lineWidth, 0 + v);
    line(0 - 12 - v, 0 - 7 + v, 0 - 28 - v - lineWidth, 0 - 16 + v - lineWidth);
    line(
      0 - 10 - v,
      0 - 10 + v,
      0 - 23 - v - lineWidth,
      0 - 23 + v - lineWidth
    );
    line(0 - 7 - v, 0 - 12 + v, 0 - 16 - v - lineWidth, 0 - 28 + v - lineWidth);
    line(0 - v, 0 - 14 + v, 0 - v, 0 - 32 + v - lineWidth);
    line(0 + 7 - v, 0 - 12 + v, 0 + 16 - v + lineWidth, 0 - 28 + v - lineWidth);
    line(
      0 + 10 - v,
      0 - 10 + v,
      0 + 23 - v + lineWidth,
      0 - 23 + v - lineWidth
    );
    line(0 + 12 - v, 0 - 7 + v, 0 + 28 - v + lineWidth, 0 - 16 + v - lineWidth);
    pop();
  }
  circle(0 - v, 0 + v, size);

  noStroke();
  fill(255);
  circle(0 - 7 + v, 0 - 5 + v, eyeSizeW);
  circle(0 + 9 + v, 0 - 5 + v, eyeSizeW);
  fill(20);
  circle(x - 7 + v, y + 0 - 4 + v, eyeSize);
  circle(x + 6 + v, y + 0 - 4 + v, eyeSize);

  x = mouseX * 0.01 - 2;
  y = mouseY * 0.01 - 2;
  pop();

  return d;
}
//change background to a cool version
function keyPressed() {
  if (key == " ") {
    spaceMode = true;
    background(22, 55, 95);
  }
}
function keyReleased() {
  if (key == " ") {
    spaceMode = false;
  }
}
