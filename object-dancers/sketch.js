/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new pigchick(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class pigchick {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.emotion = 'normal'
    this.emotionChange = 0;
    // add properties for your dancer here:
    this.bodySway = 0;
    this.hairSway = 0;
  }
  update() {
    this.x = width / 2 + sin(frameCount * 0.05) * 10;
    this.y = height / 2 + cos(frameCount * 0.05) * 10;

    this.bodySway = map(sin(frameCount / 50), -1, 1, -10, 10);
    this.hairSway = map(sin(frameCount * 0.1), -1, 1, -5, 5);

    this.emotionChange++;
    if (this.emotionChange > 120) {
      let rand = random();
      if (rand < 0.33) {
        this.emotion = 'normal';
      } else if (rand < 0.66) {
        this.emotion = 'cry';
      } else {
        this.emotion = 'blush';
      }
      this.emotionChange = 0;
      // update properties here to achieve
      // your dancer's desired moves and behaviour
    }
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    fill("yellow");
    stroke(0);
    noStroke();

    ellipse(this.bodySway, 230, 140, 160); //lowerbody
    circle(this.bodySway, 235, 150); //upperbody
    push();
    translate(this.bodySway - 70, 235);
    rotate(0.5 * sin(frameCount * 0.05));
    translate(0, 20);
    ellipse(0, 0, 20, 40); //hand
    pop();
    push();
    translate(this.bodySway + 70, 235);
    rotate(-0.5 * sin(frameCount * 0.05));
    translate(0, 20);
    ellipse(0, 0, 20, 40);
    pop();
    fill(150, 75, 0);
    circle(this.bodySway - 25, 205, 15); //eyes
    circle(this.bodySway + 25, 205, 15);
    stroke(150, 75, 0);
    line(this.bodySway - 10 + this.hairSway, 140, this.bodySway + this.hairSway, 150) //hair
    line(this.bodySway + this.hairSway, 150, this.bodySway + 10 + this.hairSway, 140);
    line(this.bodySway - 15, 310, this.bodySway - 15, 325); //leg
    line(this.bodySway + 15, 310, this.bodySway + 15, 325);
    line(this.bodySway + 15, 317, this.bodySway + 27, 321); //small right leg
    line(this.bodySway + 15, 317, this.bodySway + 5, 321);
    line(this.bodySway - 15, 317, this.bodySway - 5, 321); //small left leg
    line(this.bodySway - 15, 317, this.bodySway - 25, 321);
    fill(255, 165, 0)
    ellipse(this.bodySway, 236, 35, 21)//mouth
    ellipse(this.bodySway, 226, 43, 26)
    fill(150, 75, 0);
    circle(this.bodySway - 5, 225, 5); //nose
    circle(this.bodySway + 5, 225, 5);

    // other emotions
    if (this.emotion === 'cry') {
      stroke(150, 75, 0);
      fill(137, 207, 240);
      strokeWeight(1.5);
      arc(this.bodySway - 25, 212, 8, 12, 0, PI); // cry
    }

    if (this.emotion === 'blush') {
      stroke(221, 123, 123);
      strokeWeight(1.5);
      line(this.bodySway - 27, 230, this.bodySway - 25, 220); // blush
      line(this.bodySway - 31, 230, this.bodySway - 29, 220);
      line(this.bodySway - 35, 230, this.bodySway - 33, 220);
      line(this.bodySway + 25, 230, this.bodySway + 27, 220);
      line(this.bodySway + 29, 230, this.bodySway + 31, 220);
      line(this.bodySway + 33, 230, this.bodySway + 35, 220);
    }

    stroke(150, 75, 0)
    if (mouseIsPressed) {
      stroke(150, 75, 0);
      strokeWeight(1.5);
      line(this.bodySway - 3, 190, this.bodySway - 3, 198) //angry
      line(this.bodySway + 2, 190, this.bodySway + 2, 198)
      fill('yellow')
      noStroke();
      circle(this.bodySway - 25, 205, 15); //eyes
      circle(this.bodySway + 25, 205, 15);
      fill(150, 75, 0)
      ellipse(this.bodySway - 25, 205, 15, 9); // new eyes
      ellipse(this.bodySway + 25, 205, 15, 9)
    }





    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    pop();
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/