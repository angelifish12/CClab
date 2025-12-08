let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let gifs = [];
let gif = -1;
let gameStartSound;
let clickSound;
let sizeSound;
let select;
let bgm;
let reset;
let camera;
let firstEnter = true;

let eyeSize = 1;
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
let flippedEyeImages = [];
let eyeImage = 0;
let eyeBoxSize = 45;
let eyeBoxPadding = 5;

let noseImages = [];
let noseImage = 0;
let noseBoxSize = 45;
let noseBoxPadding = 5;

let brownCircleX = 30;
let brownCircleY = 50;
let greyCircleX = 30;
let greyCircleY = 110;
let circleSize = 40;
let eyebrowColor = "#000000";

let plusImg;
let minusImg;
let sizeIncreased = false;
let sizeDecreased = false;
let plusX = 640;
let plusY = 400;
let minusX = 760;
let minusY = 400;
let buttonSize = 80;

function preload() {
    faceMesh = ml5.faceMesh(options);
    gifs[0] = loadImage("assets/injection.gif");
    gifs[1] = loadImage("assets/tool.gif");
    gifs[2] = loadImage("assets/eyebrow.gif");
    gifs[3] = loadImage("assets/lip.gif");
    rabbitImg = loadImage("assets/rabbit.gif");
    plusImg = loadImage("assets/plus.gif");
    minusImg = loadImage("assets/minus.gif");
    gameStartSound = loadSound("assets/gamestart.mp3");
    clickSound = loadSound("assets/click.mp3");
    select = loadSound("assets/select.mp3");
    camera = loadImage("assets/camera.gif");
    sizeSound = loadSound("assets/size.mp3");
    reset = loadImage("assets/reset.gif");
    bgm = loadSound("assets/bgm.mp3");

    eyeImages = [];
    flippedEyeImages = [];
    for (let i = 1; i <= 7; i++) {
        eyeImages[i] = loadImage("assets/eyes" + i + ".png");
        flippedEyeImages[i] = loadImage("assets/eyes" + i + "-2.png");
    }
    noseImages = [];
    for (let i = 1; i <= 5; i++) {
        noseImages[i] = loadImage("assets/nose" + i + ".png");
    }

    rabbit = new Rabbit(520, 240, 200);
}

function setup() {
    let canvas = createCanvas(1040, 480);
    canvas.parent("p5-canvas-container");
    video = createCapture(VIDEO);
    video.size(videoWidth, videoHeight);
    video.hide();
    faceMesh.detectStart(video, gotFaces);
    noCursor();
}

function draw() {
    background(255);

    if (showWebcam == false) {
        rabbit.display();
        cursor(ARROW);
    } else {
        if (paused == false) {
            image(video, videoX, videoY, videoWidth, videoHeight);
        } else {
            image(pausedVideo, videoX, videoY, videoWidth, videoHeight);
        }

        if (faces.length > 0 && gif >= 0) {
            let face = faces[0];
            let faceHeight = face.box.height;

            fill(255);
            noStroke();

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
            } else {
                imageMode(CENTER);
                let eyeImgSize = eyeSize * faceHeight * 0.2;
                let maxEyeSize = face.box.width * 0.8;
                if (eyeImgSize > maxEyeSize) {
                    eyeImgSize = maxEyeSize;
                }

                let isLeftEye = (eyeImage == 1 || eyeImage == 2 || eyeImage == 4 || eyeImage == 6 || eyeImage == 7);
                if (isLeftEye) {
                    image(
                        eyeImages[eyeImage],
                        videoX + face.leftEye.centerX,
                        videoY + face.leftEye.centerY,
                        eyeImgSize,
                        eyeImgSize
                    );
                    image(
                        flippedEyeImages[eyeImage],
                        videoX + face.rightEye.centerX,
                        videoY + face.rightEye.centerY,
                        eyeImgSize,
                        eyeImgSize
                    );
                } else {
                    image(
                        flippedEyeImages[eyeImage],
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
                }
                imageMode(CORNER);
            }

            stroke(eyebrowColor);
            strokeWeight(5);
            noFill();

            let leftEyebrowStartX = videoX + face.leftEyebrow.centerX - 30;
            let leftEyebrowEndX = videoX + face.leftEyebrow.centerX + 30;
            let leftEyebrowY = videoY + face.leftEyebrow.centerY;
            line(leftEyebrowStartX, leftEyebrowY, leftEyebrowEndX, leftEyebrowY);

            let rightEyebrowStartX = videoX + face.rightEyebrow.centerX - 30;
            let rightEyebrowEndX = videoX + face.rightEyebrow.centerX + 30;
            let rightEyebrowY = videoY + face.rightEyebrow.centerY;
            line(rightEyebrowStartX, rightEyebrowY, rightEyebrowEndX, rightEyebrowY);

            noStroke();
            fill(255);

            let eyeCenterX = (face.leftEye.centerX + face.rightEye.centerX) / 2;
            let eyeCenterY = (face.leftEye.centerY + face.rightEye.centerY) / 2;
            let angle = degrees(atan2(face.rightEye.centerY - face.leftEye.centerY, face.rightEye.centerX - face.leftEye.centerX)) - 180;

            let noseX = (eyeCenterX + face.lips.centerX) / 2;
            let noseY = (eyeCenterY + face.lips.centerY) / 2;

            if (noseImage == 0) {
                fill(255);
                noStroke();
                ellipse(videoX + noseX, videoY + noseY, noseSize * faceHeight / 10, faceHeight / 15);
            } else {
                imageMode(CENTER);
                let noseImgWidth = noseSize * faceHeight * 0.35;
                let noseImgHeight = faceHeight * 0.25;
                let maxNoseWidth = face.box.width * 1;
                if (noseImgWidth > maxNoseWidth) {
                    noseImgWidth = maxNoseWidth;
                }
                image(
                    noseImages[noseImage],
                    videoX + noseX,
                    videoY + noseY,
                    noseImgWidth,
                    noseImgHeight
                );
                imageMode(CORNER);
            }

            lipsCenterX = face.lips.centerX;
            lipsCenterY = face.lips.centerY;

            let cx = face.lips.centerX;
            let cy = face.lips.centerY;
            let kps = face.keypoints;

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
            eyeSelectionBoxes();
        }
        if (gif == 0) {
            noseSelectionBoxes();
        }
        if (gif == 2) {
            fill("#964B00");
            noStroke();
            circle(brownCircleX, brownCircleY, circleSize);

            fill("#8f8f8e");
            circle(greyCircleX, greyCircleY, circleSize);

            // lerp between grey
            if (mouseX > 200 && mouseX < 400 && mouseY > 90 && mouseY < 130) {
                let t = map(mouseX, 200, 400, 0, 1);
                let lightGrey = color("#d3d3d3");
                let darkGrey = color("#151515");
                eyebrowColor = lerpColor(lightGrey, darkGrey, t);
            }

            // lerp between brown
            if (mouseX > 200 && mouseX < 400 && mouseY > 30 && mouseY < 70) {
                let t = map(mouseX, 200, 400, 0, 1);
                let lightBrown = color("#5c4033");
                let darkBrown = color("#090605");
                eyebrowColor = lerpColor(lightBrown, darkBrown, t);
            }
        }

        if (gif >= 0) {
            image(gifs[gif], gifX, gifY, gifWidth, gifHeight);

            if (gif == 0 || gif == 1) {
                if (sizeDecreased == false) {
                    image(plusImg, plusX, plusY, buttonSize, buttonSize);
                } else {
                    tint(128, 128);
                    image(plusImg, plusX, plusY, buttonSize, buttonSize);
                    noTint();
                    // remove filter
                }

                if (sizeIncreased == false) {
                    image(minusImg, minusX, minusY, buttonSize, buttonSize);
                } else {
                    tint(128, 128);
                    image(minusImg, minusX, minusY, buttonSize, buttonSize);
                    noTint();
                }
            }
        }

        noFill();
        stroke(255);
        strokeWeight(2);
        rect(videoX, videoY, videoWidth, videoHeight);

        let overSelectionBox = false;
        // google 
        if (gif == 0) {
            let startX = 10;
            let startY = videoY + 10;
            for (let i = 0; i < 6; i++) {
                let boxX = startX;
                let boxY = startY + i * (noseBoxSize + noseBoxPadding);
                if (mouseX >= boxX && mouseX <= boxX + noseBoxSize &&
                    mouseY >= boxY && mouseY <= boxY + noseBoxSize) {
                    overSelectionBox = true;
                    break;
                }
            }
        }

        if (gif == 1) {
            let startX = 10;
            let startY = videoY + 10;
            for (let i = 0; i < 8; i++) {
                let boxX = startX;
                let boxY = startY + i * (eyeBoxSize + eyeBoxPadding);
                if (mouseX >= boxX && mouseX <= boxX + eyeBoxSize &&
                    mouseY >= boxY && mouseY <= boxY + eyeBoxSize) {
                    overSelectionBox = true;
                    break;
                }
            }
        }

        let overWebcam = mouseX >= videoX && mouseX <= videoX + videoWidth &&
            mouseY >= videoY && mouseY <= videoY + videoHeight;
        // tool cursors only when over webcam
        if (overWebcam && !overSelectionBox && gif >= 0) {
            if (gif == 0) {
                imageMode(CENTER);
                image(gifs[0], mouseX, mouseY, 60, 60);
                imageMode(CORNER);
                strokeWeight(4);
                text('nose injection', 50, 50);
            } else if (gif == 1) {
                imageMode(CENTER);
                image(gifs[1], mouseX, mouseY, 60, 60);
                imageMode(CORNER);
                strokeWeight(4);
                text('eye sculptor', 50, 50);
            } else if (gif == 2) {
                imageMode(CENTER);
                image(gifs[2], mouseX, mouseY, 60, 60);
                imageMode(CORNER);
                strokeWeight(4);
                text('brow mist', 50, 50);
            } else if (gif == 3) {
                imageMode(CENTER);
                image(gifs[3], mouseX, mouseY, 60, 60);
                imageMode(CORNER);
                strokeWeight(4);
                text('lip plump', 50, 50);
            }
        } else if (overSelectionBox) {
            cursor(ARROW);
        } else {
            cursor(ARROW);
        }
    }
}

function noseSelectionBoxes() {
    let startX = 10;
    let startY = videoY + 10;

    for (let i = 0; i < 6; i++) {
        let boxX = startX;
        let boxY = startY + i * (noseBoxSize + noseBoxPadding);

        if (noseImage == i) {
            fill(200, 200, 255);
            stroke(0, 0, 255);
            strokeWeight(3);
        } else {
            fill(255);
            stroke(0);
            strokeWeight(1);
        }
        rect(boxX, boxY, noseBoxSize, noseBoxSize);

        if (i == 0) {
            fill(255);
            noStroke();
            circle(boxX + noseBoxSize / 2, boxY + noseBoxSize / 2, noseBoxSize * 0.5);
        } else {
            imageMode(CORNER);
            let img = noseImages[i];
            let aspect = img.width / img.height;
            let displayWidth, displayHeight;

            if (aspect > 1) {
                displayWidth = noseBoxSize * 0.9;
                displayHeight = displayWidth / aspect;
            } else {
                displayHeight = noseBoxSize * 0.9;
                displayWidth = displayHeight * aspect;
            }

            let imgX = boxX + (noseBoxSize - displayWidth) / 2;
            let imgY = boxY + (noseBoxSize - displayHeight) / 2;

            image(noseImages[i], imgX, imgY, displayWidth, displayHeight);
        }
    }
}

function eyeSelectionBoxes() {
    let startX = 10;
    let startY = videoY + 10;

    for (let i = 0; i < 8; i++) {
        let boxX = startX;
        let boxY = startY + i * (eyeBoxSize + eyeBoxPadding);

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

        if (i == 0) {
            fill(255);
            noStroke();
            circle(boxX + eyeBoxSize / 2, boxY + eyeBoxSize / 2, eyeBoxSize * 0.5);
        } else {
            imageMode(CORNER);
            let img = eyeImages[i];
            let aspect = img.width / img.height;
            let displayWidth, displayHeight;

            if (aspect > 1) {
                displayWidth = eyeBoxSize * 0.9;
                displayHeight = displayWidth / aspect;
            } else {
                displayHeight = eyeBoxSize * 0.9;
                displayWidth = displayHeight * aspect;
            }

            let imgX = boxX + (eyeBoxSize - displayWidth) / 2;
            let imgY = boxY + (eyeBoxSize - displayHeight) / 2;

            image(eyeImages[i], imgX, imgY, displayWidth, displayHeight);
        }
    }
}

function gotFaces(results) {
    if (paused == false) {
        faces = results;
    }
}

function mousePressed() {
    if (showWebcam == false) {
        if (rabbit.isClicked(mouseX, mouseY)) {
            showWebcam = true;
            document.getElementById("title").classList.remove("hidden-text");
            document.getElementById("instructions").classList.remove("hidden-text");
            document.getElementById("tool-info").classList.remove("hidden-text");
            // javascript
            bgm.loop();
        }
    } else {
        if (gif == 0 || gif == 1) {
            if (mouseX >= plusX && mouseX <= plusX + buttonSize &&
                mouseY >= plusY && mouseY <= plusY + buttonSize) {
                if (sizeDecreased == false) {
                    if (gif == 0) {
                        noseSize = noseSize + 0.2;
                    } else if (gif == 1) {
                        eyeSize++;
                    }
                    sizeIncreased = true;
                    sizeSound.play();
                }
                return;
            }

            if (mouseX >= minusX && mouseX <= minusX + buttonSize &&
                mouseY >= minusY && mouseY <= minusY + buttonSize) {
                if (sizeIncreased == false) {
                    if (gif == 0) {
                        if (noseSize > 0.2) {
                            noseSize = noseSize - 0.2;
                        }
                    } else if (gif == 1) {
                        if (eyeSize > 0.5) {
                            eyeSize--;
                        }
                    }
                    sizeDecreased = true;
                    sizeSound.play();
                }
                return;
            }
        }

        if (gif == 1) {
            let startX = 10;
            let startY = videoY + 10;

            for (let i = 0; i < 8; i++) {
                let boxX = startX;
                let boxY = startY + i * (eyeBoxSize + eyeBoxPadding);

                if (mouseX >= boxX && mouseX <= boxX + eyeBoxSize &&
                    mouseY >= boxY && mouseY <= boxY + eyeBoxSize) {
                    eyeImage = i;
                    select.play();
                    return;
                }
            }
        }

        if (gif == 0) {
            let startX = 10;
            let startY = videoY + 10;

            for (let i = 0; i < 6; i++) {
                let boxX = startX;
                let boxY = startY + i * (noseBoxSize + noseBoxPadding);

                if (mouseX >= boxX && mouseX <= boxX + noseBoxSize &&
                    mouseY >= boxY && mouseY <= boxY + noseBoxSize) {
                    noseImage = i;
                    select.play();
                    return;
                }
            }
        }

        if (gif == 2) {
            let dBrown = dist(mouseX, mouseY, brownCircleX, brownCircleY);
            if (dBrown < circleSize / 2) {
                eyebrowColor = "#964B00";
                select.play();
                return;
            }

            let dGrey = dist(mouseX, mouseY, greyCircleX, greyCircleY);
            if (dGrey < circleSize / 2) {
                eyebrowColor = "#8f8f8e";
                select.play();
                return;
            }
        }

        if (gif == 3 && faces.length > 0) {
            let d = dist(mouseX, mouseY, lipsCenterX, lipsCenterY);
            if (d < 50) {
                lipsScale += 0.05;
                lipsStroke += 2;
                if (lipsScale > 2) lipsScale = 2;
                if (lipsStroke > 40) lipsStroke = 40;

                select.play();
            }
        }
    }
}

function keyPressed() {
    if (keyCode == ENTER) {
        if (firstEnter == true) {
            gameStartSound.play();
            firstEnter = false;
        }
        paused = !paused;
        if (paused) {
            pausedVideo = video.get();
        }
    }

    if (key == '1') {
        gif = 0;
        sizeIncreased = false;
        sizeDecreased = false;
        clickSound.play();
    }
    if (key == '2') {
        gif = 1;
        sizeIncreased = false;
        sizeDecreased = false;
        clickSound.play();
    }
    if (key == '3') {
        gif = 2;
        clickSound.play();
    }
    if (key == '4') {
        gif = 3;
        clickSound.play();
    }
}

class Rabbit {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    display() {
        imageMode(CENTER);
        image(rabbitImg, this.x, this.y, this.size, this.size);
        imageMode(CORNER);
    }

    isClicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        return d < this.size / 2;
    }
}