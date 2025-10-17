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

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  x = 0;
  y = 0;
  circleSize1 = 40;
  circleSize2 = 40;
  circleSize3 = 40;
  // noLoop();
}

function draw() {
  background(20, 50, 95);
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

  let starCount = 200;
  for (let i = 0; i < starCount; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(1, 3); //tiny dots
    circle(x, y, d);
  }

  if (mouseIsPressed) {
    let lightSize = 180;
    push();
    fill(255, 239, 145);
    circle(mouseX, mouseY, lightSize);
    pop();
    // let lightDist1 = dist(mouseX, mouseY, width / 2, height / 2);
    // let lightDist2 = dist(mouseX, mouseY, width / 2 + 100, height / 2 + 150);
    // let lightDist3 = dist(mouseX, mouseY, width / 2 - 150, height / 2 + 100);
    // if (lightDist1 < 30) {
    //   circleSize1 = 0;
    //   eyeSize1 = 0;
    //   eyeSizeW1 = 0;
    //   speed = 0;
    // }
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
  // x axis move side to side, y axis move up and down;

  push();
  fill(30);
  stroke(20);
  // spikes
  line(0 + 14 - v, 0 + v, 0 + 32 - v + lineWidth, 0 + v);
  line(0 + 12 - v, 0 + 7 + v, 0 + 28 - v + lineWidth, 0 + 16 + v + lineWidth);
  line(0 + 10 - v, 0 + 10 + v, 0 + 23 - v + lineWidth, 0 + 23 + v + lineWidth);
  line(0 + 7 - v, 0 + 12 + v, 0 + 16 - v + lineWidth, 0 + 28 + v + lineWidth);
  line(0 - v, 0 + 14 + v, 0 - v, 0 + 32 + v + lineWidth);
  line(0 - 7 - v, 0 + 12 + v, 0 - 16 - v - lineWidth, 0 + 28 + v + lineWidth);
  line(0 - 10 - v, 0 + 10 + v, 0 - 23 - v - lineWidth, 0 + 23 + v + lineWidth);
  line(0 - 12 - v, 0 + 7 + v, 0 - 28 - v - lineWidth, 0 + 16 + v + lineWidth);
  line(0 - 14 - v, 0 + v, 0 - 32 - v - lineWidth, 0 + v);
  line(0 - 12 - v, 0 - 7 + v, 0 - 28 - v - lineWidth, 0 - 16 + v - lineWidth);
  line(0 - 10 - v, 0 - 10 + v, 0 - 23 - v - lineWidth, 0 - 23 + v - lineWidth);
  line(0 - 7 - v, 0 - 12 + v, 0 - 16 - v - lineWidth, 0 - 28 + v - lineWidth);
  line(0 - v, 0 - 14 + v, 0 - v, 0 - 32 + v - lineWidth);
  line(0 + 7 - v, 0 - 12 + v, 0 + 16 - v + lineWidth, 0 - 28 + v - lineWidth);
  line(0 + 10 - v, 0 - 10 + v, 0 + 23 - v + lineWidth, 0 - 23 + v - lineWidth);
  line(0 + 12 - v, 0 - 7 + v, 0 + 28 - v + lineWidth, 0 - 16 + v - lineWidth);
  pop();

  // body
  circle(0 - v, 0 + v, size);

  // eyes (A)
  noStroke();

  fill(255); // whites
  circle(0 - 7 + v, 0 - 5 + v, eyeSizeW);
  circle(0 + 9 + v, 0 - 5 + v, eyeSizeW);
  fill(20); // pupils
  circle(x - 7 + v, y + 0 - 4 + v, eyeSize);
  circle(x + 6 + v, y + 0 - 4 + v, eyeSize);
  // circle(x, height/2, 50);
  x = mouseX * 0.01 - 2;
  y = mouseY * 0.01 - 2;
  pop();

  return d;
}
