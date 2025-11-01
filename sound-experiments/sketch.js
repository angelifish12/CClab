let osc;

function setup() {
  let cnv = createCanvas(100, 100);
  background(220);
  textAlign(CENTER);
  text('tap to play', width / 2, height / 2);

  osc = new p5.Oscillator('square');
  osc.amp(0.5);
  delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime (in seconds), feedback, filter frequency
  delay.process(osc, 0.12, .7, 2300);

  cnv.mousePressed(oscStart);
}

function oscStart() {
  osc.start();
}

function mouseReleased() {
  osc.stop();
}