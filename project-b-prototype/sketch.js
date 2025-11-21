let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let gifs = [];
let currentGif = 0;
// let background;
// let img;

let eyeSize = 1;
let eyebrowColor = 255;
let mouthHeight = 60;
let noseSize = 1;
let paused = false;
let pausedVideo;

let videoX = 0;
let videoY = 0;
let videoWidth = 640;
let videoHeight = 480;

let gifX = 640;
let gifY = 0;
let gifWidth = 400;
let gifHeight = 480;

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
  gifs[0] = loadImage("assets/injection.gif")
  gifs[1] = loadImage("assets/tool.gif")
  gifs[2] = loadImage("assets/eyebrow.gif")
  gifs[3] = loadImage("assets/lip.gif")
}
function setup() {
  let canvas = createCanvas(1040, 480);
  canvas.parent("p5-canvas-container");
  // background = createGraphics(width, height);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}


function draw() {
  background(255);
  // Draw the webcam video
  if (paused == false) {
    image(video, videoX, videoY, videoWidth, videoHeight);
  } else {
    image(pausedVideo, videoX, videoY, videoWidth, videoHeight);
  }

  // image(gifs[currentGif], 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];
    //console.log(face);

    let faceHeight = face.box.height;

    fill(255);
    noStroke();

    // draw eyes
    circle(
      videoX + face.leftEye.centerX,
      videoY + face.leftEye.centerY,
      eyeSize * faceHeight * 0.1
    );
    circle(
      videoX + face.rightEye.centerX,
      videoY + face.rightEye.centerY,
      eyeSize * faceHeight * 0.1
    );

    // draw eyebrow
    fill(eyebrowColor);
    circle(
      videoX + face.leftEyebrow.centerX,
      videoY + face.leftEyebrow.centerY,
      faceHeight * 0.15
    );
    circle(
      videoX + face.rightEyebrow.centerX,
      videoY + face.rightEyebrow.centerY,
      faceHeight * 0.15
    );
    fill(255);
    // estimate the nose position from
    // eyes and mouth
    let eyeCenterX = (face.leftEye.centerX + face.rightEye.centerX) / 2;
    let eyeCenterY = (face.leftEye.centerY + face.rightEye.centerY) / 2;
    let noseX = (eyeCenterX + face.lips.centerX) / 2;
    let noseY = (eyeCenterY + face.lips.centerY) / 2;

    // calculate the rotation angle from the eyes
    let angle = degrees(atan2(face.rightEye.centerY - face.leftEye.centerY, face.rightEye.centerX - face.leftEye.centerX)) - 180;
    console.log('angle is', angle);

    // draw nose
    circle(videoX + noseX, videoY + noseY, noseSize * faceHeight / 10);

    // draw mouth (using rotation)
    push();
    translate(videoX + face.lips.centerX, videoY + face.lips.centerY);
    rotate(radians(angle));
    rectMode(CENTER);
    rect(0, 0, 10, mouthHeight);
    pop();
  }
  image(gifs[currentGif], gifX, gifY, gifWidth, gifHeight)
  // image(background, 0, 0);
  // video outline
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(videoX, videoY, videoWidth, videoHeight);
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  if (paused == false) {
    faces = results;
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    if (currentGif == 0) {
      noseSize = noseSize - 0.2
    } else if (currentGif == 1) {
      eyeSize++;
    } else if (currentGif == 2) {
      eyebrowColor = eyebrowColor - 15;
    } else if (currentGif == 3) {
      mouthHeight = mouthHeight + 5;
    }
  }
  // if (keyCode == DOWN_ARROW) {
  //   if (currentGif == 0) {
  //     noseSize = noseSize + 0.2
  //   } else if (currentGif == 1) {
  //     eyeSize--;
  //   } else if (currentGif == 2) {
  //     eyebrowColor = eyebrowColor + 15;
  //   } else if (currentGif == 3) {
  //     mouthHeight = mouthHeight - 5;
  //   }
  // }

  if (keyCode == ENTER) {
    paused = !paused;  // inverts paused
    pausedVideo = video.get();  // make a copy of the current camera frame
  }
  if (key == '1') currentGif = 0;
  if (key == '2') currentGif = 1;
  if (key == '3') currentGif = 2;
  if (key == '4') currentGif = 3;
}
