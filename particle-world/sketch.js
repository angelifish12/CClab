let NUM_OF_PARTICLES = 28; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 100; // Decide the maximum number of particles.
let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(random(width), random(height), random(0.5, 1.5)))
  }
}

function draw() {
  background(lerpColor(color(0, 12, 66), color(179, 98, 0), map(mouseX, 0, width, 0, 1)));
  // consider generating particles in draw(), using Dynamic Array

  // update and display
  // particles.push(new Particle(mouseX, mouseY));
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}
class Particle {
  // constructor function
  constructor(startX, startY, s) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 30;
    this.speedX = random(-1, 1);
    this.speedY = random(-2, -1);
    this.isVisible = true;
    this.s = s;
  }
  // methods (functions): particle's behaviors
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    //this.speedY += 0.1;
    this.speedX *= 0.99;
    this.isOnCanvas();
  }
  isOnCanvas() {
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
  }
  display() {
    let color1 = color(255, 174, 66);
    let color2 = color(205, 214, 106);
    let amt = map(sin(frameCount * 0.05), -1, 1, 0, 1);
    // particle's appearance
    push();
    scale(this.s); //LA approved
    translate(this.x, this.y);
    noStroke();
    fill(245, 130, 0);
    triangle(-70, -155, 70, -155, -10, 0);
    fill('orange')
    rect(-60, -155, this.dia + 90, 150); //bottom
    fill(255, 150, 0);
    rect(-60, -135, this.dia + 90, 70);
    fill(245, 130, 0);
    rect(-60, -155, this.dia + 90, 50); //top
    fill(248, 213, 104);
    ellipse(0, 0, this.dia + 90, 90); //big circle
    fill(lerpColor(color1, color2, amt));
    ellipse(0, 0, this.dia + 70, 70); //smaller circle
    strokeWeight(0.5)
    stroke(245, 130, 0);
    line(0, -155, 0, -45);
    noStroke();
    fill('white');
    rotate(sin(frameCount * 0.001));
    ellipse(0, -10, this.dia - 10, 40); //light
    pop();
  }
}