let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let gifs = [];
let gif = 0;
let gameStartSound;
let clickSound;
let firstEnter = true;

// let background;
// let img;

let eyeSize = 1;
let eyebrowColor = 255;
let mouthHeight = 60;
let noseSize = 1;
let lipsScale = 1;
let lipsStroke = 4;
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

let rabbit;
let rabbitImg;
let showWebcam = false;

let lipsCenterX = 0;
let lipsCenterY = 0;

let eyeImages = [];
let eyeImage = 0;
let eyeBoxSize = 45;
let eyeBoxPadding = 5;

function preload() {
    faceMesh = ml5.faceMesh(options);
    gifs[0] = loadImage("assets/injection.gif");
    gifs[1] = loadImage("assets/tool.gif");
    gifs[2] = loadImage("assets/eyebrow.gif");
    gifs[3] = loadImage("assets/lip.gif");
    rabbitImg = loadImage("assets/rabbit.gif");
    gameStartSound = loadSound("assets/gamestart.mp3");
    clickSound = loadSound("assets/click.mp3");
    rabbit = new Rabbit(520, 240, 200);

    eyeImages = new Array(8);
    // eye img
    for (let i = 1; i <= 7; i++) {
        eyeImages[i] = loadImage("assets/eyes" + i + ".png");
    }
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
    noCursor();
}


function draw() {
    background(255);
    // Draw the webcam video
    if (showWebcam == false) {
        rabbit.display();
        // normal cursor outside the camera
        cursor(ARROW);
    } else {
        if (paused == false) {
            image(video, videoX, videoY, videoWidth, videoHeight);
        } else {
            image(pausedVideo, videoX, videoY, videoWidth, videoHeight);
        }
        if (faces.length > 0) {
            let face = faces[0];
            //console.log(face);

            let faceHeight = face.box.height;

            // eat pill
            // for (let i = 0; i < faces.length; i++) {

            //     let face = faces[i];
            //     let p1 = face.keypoints[0];
            //     let p2 = face.keypoints[14];
            //     fill(0, 255, 0);
            //     noStroke();
            //     circle(p1.x, p1.y, 5);
            //     circle(p2.x, p2.y, 5);
            //     let d = dist(p1.x, p1.y, p2.x, p2.y);
            //     console.log(d);
            //     fill(0);
            //     circle(x, y, 50);
            //     if (d > 40) {
            //       x = lerp(x, p1.x, 0.1);
            //       y = lerp(y, p1.y, 0.1);
            //     }

            //     for (let j = 0; j < face.keypoints.length; j++) {
            //       let keypoint = face.keypoints[j];
            //     }
            //   }
            // }


            fill(255);
            noStroke();
            //circle
            if (eyeImage == 0) {
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
                // other eye img
            } else {
                // draw from center
                imageMode(CENTER);
                let eyeImgSize = eyeSize * faceHeight * 0.2;
                // maximun eye size
                let maxEyeSize = face.box.width * 0.8;
                if (eyeImgSize > maxEyeSize) {
                    eyeImgSize = maxEyeSize;
                }

                image(
                    eyeImages[eyeImage],
                    videoX + face.leftEye.centerX,
                    videoY + face.leftEye.centerY,
                    eyeImgSize,
                    eyeImgSize
                );
                image(
                    eyeImages[eyeImage],
                    videoX + face.rightEye.centerX,
                    videoY + face.rightEye.centerY,
                    eyeImgSize,
                    eyeImgSize
                );

                imageMode(CORNER);
            }
            // draw eyebrow
            stroke(eyebrowColor);
            strokeWeight(5);
            noFill();

            // left eyebrow
            let leftBrowStartX = videoX + face.leftEyebrow.centerX - 30;
            let leftBrowEndX = videoX + face.leftEyebrow.centerX + 30;
            let leftBrowY = videoY + face.leftEyebrow.centerY;
            line(leftBrowStartX, leftBrowY, leftBrowEndX, leftBrowY);

            // right eyebrow
            let rightBrowStartX = videoX + face.rightEyebrow.centerX - 30;
            let rightBrowEndX = videoX + face.rightEyebrow.centerX + 30;
            let rightBrowY = videoY + face.rightEyebrow.centerY;
            line(rightBrowStartX, rightBrowY, rightBrowEndX, rightBrowY);
            noStroke();
            fill(255);
            // estimate the nose position from
            // eyes and mouth
            let eyeCenterX = (face.leftEye.centerX + face.rightEye.centerX) / 2;
            let eyeCenterY = (face.leftEye.centerY + face.rightEye.centerY) / 2;
            let noseX = (eyeCenterX + face.lips.centerX) / 2;
            let noseY = (eyeCenterY + face.lips.centerY) / 2;

            // calculate the rotation angle from the eyes, now dont rly use
            let angle = degrees(atan2(face.rightEye.centerY - face.leftEye.centerY, face.rightEye.centerX - face.leftEye.centerX)) - 180;
            // console.log("angle is", angle);

            // draw nose
            circle(videoX + noseX, videoY + noseY, noseSize * faceHeight / 10);

            // code for figuring out keypoints

            // for (let i = 0; i < face.keypoints.length; i++) {
            //     let kp = face.keypoints[i];
            //     let d = dist(mouseX, mouseY, kp.x, kp.y);
            //     if (d < 3) {
            //         fill(255);
            //         textSize(14);
            //         textAlign(CENTER, CENTER);
            //         text(i, kp.x, kp.y);
            //         break;
            //     }
            // }
            // saving values
            lipsCenterX = face.lips.centerX;
            lipsCenterY = face.lips.centerY;

            let cx = face.lips.centerX;
            let cy = face.lips.centerY;
            let kps = face.keypoints;
            // lips
            push();
            translate(cx, cy);
            scale(lipsScale, lipsScale);
            strokeWeight(lipsStroke);
            stroke("darkred");
            noFill();
            beginShape();
            vertex(kps[62].x - cx, kps[62].y - cy);
            vertex(kps[74].x - cx, kps[74].y - cy);
            vertex(kps[72].x - cx, kps[72].y - cy);
            vertex(kps[11].x - cx, kps[11].y - cy);
            vertex(kps[302].x - cx, kps[302].y - cy);
            vertex(kps[270].x - cx, kps[270].y - cy);
            vertex(kps[292].x - cx, kps[292].y - cy);
            vertex(kps[315].x - cx, kps[315].y - cy);
            vertex(kps[85].x - cx, kps[85].y - cy);
            endShape(CLOSE);
            rotate(radians(angle));
            pop();
        }

        if (gif == 1) {
            drawEyeSelectionBoxes();
        }
        // draws
        image(gifs[gif], gifX, gifY, gifWidth, gifHeight)
        // image(background, 0, 0);
        // video outline
        noFill();
        stroke(255);
        strokeWeight(2);
        rect(videoX, videoY, videoWidth, videoHeight);
        if (gif == 3) {
            imageMode(CENTER);
            // lips at mouse position
            image(gifs[3], mouseX, mouseY, 60, 60);
            // resets to default
            imageMode(CORNER);
        }
    }
}

// eye selection boxes
function drawEyeSelectionBoxes() {
    let startX = 10; // left side
    let startY = videoY + 10;

    // boxes
    for (let i = 0; i < 8; i++) {
        let boxX = startX;
        let boxY = startY + i * (eyeBoxSize + eyeBoxPadding);

        // box bg
        if (eyeImage == i) {
            fill(200, 200, 255);
            stroke(0, 0, 255);
            strokeWeight(3);
        } else {
            fill(255);
            stroke(0);
            strokeWeight(1);
        }
        rect(boxX, boxY, eyeBoxSize, eyeBoxSize);

        // eye preview on top of the box
        if (i == 0) {
            fill(255);
            noStroke();
            circle(boxX + eyeBoxSize / 2, boxY + eyeBoxSize / 2, eyeBoxSize * 0.5);
        } else {
            // no compression
            imageMode(CORNER);
            // original img dimension
            let img = eyeImages[i];
            let imgAspect = img.width / img.height;
            let displayWidth, displayHeight;

            if (imgAspect > 1) {
                displayWidth = eyeBoxSize * 0.9;
                displayHeight = displayWidth / imgAspect;
            } else {
                displayHeight = eyeBoxSize * 0.9;
                displayWidth = displayHeight * imgAspect;
            }

            // center img in the box
            let imgX = boxX + (eyeBoxSize - displayWidth) / 2;
            let imgY = boxY + (eyeBoxSize - displayHeight) / 2;

            image(eyeImages[i], imgX, imgY, displayWidth, displayHeight);
        }
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
    // Save the output to the faces variable
    if (paused == false) {
        faces = results;
    }
}

function mousePressed() {
    if (showWebcam == false) {
        if (rabbit.isClicked(mouseX, mouseY)) {
            showWebcam = true;
            // javascript
            document.getElementById("title").classList.remove("hidden-text");
            document.getElementById("instructions").classList.remove("hidden-text");
        }
    } else {
        // check if clicking on eye selection boxes
        if (gif == 1) {
            let startX = 10; // left
            let startY = videoY + 10;

            // box
            for (let i = 0; i < 8; i++) {
                let boxX = startX;
                let boxY = startY + i * (eyeBoxSize + eyeBoxPadding);

                if (mouseX >= boxX && mouseX <= boxX + eyeBoxSize &&
                    mouseY >= boxY && mouseY <= boxY + eyeBoxSize) {
                    eyeImage = i;
                    clickSound.play();
                    return;
                }
            }
        }

        // lips selected
        if (gif == 3 && faces.length > 0) {
            // click on the lips area
            let d = dist(mouseX, mouseY, lipsCenterX, lipsCenterY);
            if (d < 50) {
                lipsScale += 0.05;
                lipsStroke += 2;
                // max
                if (lipsScale > 2) lipsScale = 2;
                if (lipsStroke > 40) lipsStroke = 40;

                clickSound.play();
            }
        }
    }
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        if (gif == 0) {
            if (noseSize > 0.2) {
                noseSize = noseSize - 0.2;
            }
        } else if (gif == 1) {
            eyeSize++;
        } else if (gif == 2) {
            eyebrowColor = eyebrowColor - 15;
        }
    }

    if (keyCode == ENTER) {
        if (firstEnter == true) {
            gameStartSound.play();
            firstEnter = false;
        }
        paused = !paused;  // inverts paused
        pausedVideo = video.get();  // make a copy of the current camera frame
    }
    if (key == "1") { gif = 0; clickSound.play(); }
    if (key == "2") { gif = 1; clickSound.play(); }
    if (key == "3") { gif = 2; clickSound.play(); }
    if (key == "4") { gif = 3; clickSound.play(); }
}
class Rabbit {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    display() {
        // Draw rabbit
        imageMode(CENTER);
        image(rabbitImg, this.x, this.y, this.size, this.size);
        imageMode(CORNER);
    }

    isClicked(mx, my) {
        // mouse
        let d = dist(mx, my, this.x, this.y);
        return d < this.size / 2;
    }
}
