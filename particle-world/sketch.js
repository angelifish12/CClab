// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 3; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 500; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  // background(30, 42, 86);
  background(lerpColor(color(30, 42, 86), color(179, 98, 0), map(mouseX, 0, width, 0, 1)));

  // consider generating particles in draw(), using Dynamic Array

  // update and display
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
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 30;
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, 140, 0)
    triangle(-70, -155, 70, -155, -10, 0);
    fill('orange')
    rect(-60, -155, this.dia + 90, 150); //bottom
    fill(255, 150, 0)
    rect(-60, -135, this.dia + 90, 70);
    fill(255, 140, 0)
    rect(-60, -155, this.dia + 90, 50); //top
    fill(248, 213, 104)
    ellipse(0, 0, this.dia + 90, 90); //big circle
    fill(255, 174, 66)
    ellipse(0, 0, this.dia + 70, 70); //big circle
    fill('white')
    ellipse(0, -10, this.dia - 10, 40); //light
    pop();
  }
}
