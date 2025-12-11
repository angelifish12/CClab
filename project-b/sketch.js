let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let gifs = [];
let gif = -1;
let gameStart;
let clickSound;
let sizeSound;
let warning;
let select;
let bgm;
let reset;
let camera;
let cameraSound;
let freeze;
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

let gifX = 680;
let gifY = 70;
let gifWidth = 200;
let gifHeight = 240;

let rabbit;
let rabbitImg;
let showWebcam = false;

let lipsCenterX = 0;
let lipsCenterY = 0;

let eyeImages = [];
let flippedEyeImages = [];
let eyeImage = 0;
let eyeBoxSize = 45;
let eyeBoxPadding = 5; //space between boxes

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
let eyebrowSelected = false;

let plus;
let minus;
let sizeIncreased = false;
let sizeDecreased = false;
let plusX = 710;
let plusY = 360;
let minusX = 760;
let minusY = 360;
let buttonSize = 80;

let freezeX = 220;
let freezeY = 490;
let freezeSize = 100;

let lipsVisible = false;

let cameraX = 320;
let cameraY = 490;
let cameraSize = 100;

let resetButtonX = 420;
let resetButtonY = 490;
let resetButtonSize = 100;

let takePicture = true;

let tool1X = 650;
let tool1Y = 30;
let tool2X = 730;
let tool2Y = 30;
let tool3X = 810;
let tool3Y = 30;
let tool4X = 890;
let tool4Y = 30;
let toolButtonSize = 50;

let capture = false;

let warningShown = false;
let warningOpen = false;


function preload() {
    faceMesh = ml5.faceMesh(options);
    gifs[0] = loadImage("assets/injection.gif");
    gifs[1] = loadImage("assets/tool.gif");
    gifs[2] = loadImage("assets/eyebrow.gif");
    gifs[3] = loadImage("assets/lip.gif");
    rabbitImg = loadImage("assets/rabbit.gif");
    plus = loadImage("assets/plus.gif");
    minus = loadImage("assets/minus.gif");
    freeze = loadImage("assets/freeze.gif");
    gameStart = loadSound("assets/gamestart.mp3");
    clickSound = loadSound("assets/click.mp3");
    warning = loadSound("assets/warning.mp3")
    select = loadSound("assets/select.mp3");
    camera = loadImage("assets/camera.gif");
    cameraSound = loadSound("assets/camera.mp3")
    sizeSound = loadSound("assets/size.mp3");
    reset = loadImage("assets/reset.gif");
    bgm = loadSound("assets/bgm.mp3");

    eyeImages = [];
    flippedEyeImages = [];
    // eye images
    for (let i = 1; i <= 7; i++) {
        eyeImages[i] = loadImage("assets/eyes" + i + ".png");
        flippedEyeImages[i] = loadImage("assets/eyes" + i + "-2.png");
    }
    noseImages = [];
    // nose images
    for (let i = 1; i <= 5; i++) {
        noseImages[i] = loadImage("assets/nose" + i + ".png");
    }

    rabbit = new Rabbit(520, 240, 200);
}

function setup() {
    let canvas = createCanvas(1200, 600);
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
            //eye center on users eye
            if (eyeImage > 0) {
                imageMode(CENTER);
                let eyeImgSize = eyeSize * faceHeight * 0.2; //size of the eye img
                let maxEyeSize = face.box.width * 0.8;
                if (eyeImgSize > maxEyeSize) {
                    eyeImgSize = maxEyeSize; //maximun eye size
                }
                //which eye img the user picks
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


            // examples from https://editor.p5js.org/xinxin/sketches/nC-CYIRGt

            if (eyebrowSelected) {
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
            }

            let eyeCenterX = (face.leftEye.centerX + face.rightEye.centerX) / 2;
            let eyeCenterY = (face.leftEye.centerY + face.rightEye.centerY) / 2;
            let angle = degrees(atan2(face.rightEye.centerY - face.leftEye.centerY, face.rightEye.centerX - face.leftEye.centerX)) - 180;

            let noseX = (eyeCenterX + face.lips.centerX) / 2;
            let noseY = (eyeCenterY + face.lips.centerY) / 2;

            if (noseImage > 0) {
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
            //lips
            if (lipsVisible) {
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
        }

        if (takePicture) {
            if (gif == 1) {
                eyeSelectionBoxes();
            }
            if (gif == 0) {
                noseSelectionBoxes();
            }
            if (gif == 2) {
                fill("#964B00");
                stroke(244, 194, 194);
                strokeWeight(2);
                circle(brownCircleX, brownCircleY, circleSize);

                fill("#8f8f8e");
                circle(greyCircleX, greyCircleY, circleSize);

                if (mouseX > 200 && mouseX < 400 && mouseY > 90 && mouseY < 130) {
                    let t = map(mouseX, 200, 400, 0, 1);
                    let lightGrey = color("#d3d3d3");
                    let darkGrey = color("#151515");
                    eyebrowColor = lerpColor(lightGrey, darkGrey, t);
                }

                if (mouseX > 200 && mouseX < 400 && mouseY > 30 && mouseY < 70) {
                    let t = map(mouseX, 200, 400, 0, 1);
                    let lightBrown = color("#5c4033");
                    let darkBrown = color("#090605");
                    eyebrowColor = lerpColor(lightBrown, darkBrown, t);
                }
            }

            if (gif >= 0) {
                fill('pink');
                noStroke();
                textSize(30);
                textAlign(CENTER, CENTER);
                textFont('Indie Flower');

                if (gif == 0) {
                    text('nose injection', gifX + gifWidth / 2, gifY + gifHeight + 20);
                } else if (gif == 1) {
                    text('eye sculptor', gifX + gifWidth / 2, gifY + gifHeight + 20);
                } else if (gif == 2) {
                    text('brow mist', gifX + gifWidth / 2, gifY + gifHeight + 20);
                } else if (gif == 3) {
                    text('lip plump', gifX + gifWidth / 2, gifY + gifHeight + 20);
                }

                image(gifs[gif], gifX, gifY, gifWidth, gifHeight);

                if (gif == 0 || gif == 1) {
                    if (sizeDecreased == false) {
                        image(plus, plusX, plusY, buttonSize, buttonSize);
                    } else {
                        tint(128, 128);
                        image(plus, plusX, plusY, buttonSize, buttonSize);
                        noTint();
                    }

                    if (sizeIncreased == false) {
                        image(minus, minusX, minusY, buttonSize, buttonSize);
                    } else {
                        tint(128, 128);
                        image(minus, minusX, minusY, buttonSize, buttonSize);
                        noTint();
                    }
                }
            }
            // tool selection buttons
            if (takePicture) {
                // tool 1
                if (gif == 0) {
                    tint(255, 0, 128); // highlight if selected
                }
                image(gifs[0], tool1X, tool1Y, toolButtonSize, toolButtonSize);
                noTint();

                // tool 2
                if (gif == 1) {
                    tint(255, 200, 200);
                }
                image(gifs[1], tool2X, tool2Y, toolButtonSize, toolButtonSize);
                noTint();

                // tool 3
                if (gif == 2) {
                    tint(255, 200, 200);
                }
                image(gifs[2], tool3X, tool3Y, toolButtonSize, toolButtonSize);
                noTint();

                // tool 4
                if (gif == 3) {
                    tint(255, 200, 200);
                }
                image(gifs[3], tool4X, tool4Y, toolButtonSize, toolButtonSize);
                noTint();

                noFill();
                stroke(244, 194, 194);
                strokeWeight(3);
                rect(tool1X, tool1Y, toolButtonSize, toolButtonSize);
                rect(tool2X, tool2Y, toolButtonSize, toolButtonSize);
                rect(tool3X, tool3Y, toolButtonSize, toolButtonSize);
                rect(tool4X, tool4Y, toolButtonSize, toolButtonSize);
            }
        }

        image(freeze, freezeX, freezeY, freezeSize, freezeSize);
        image(camera, cameraX, cameraY, cameraSize, cameraSize);
        image(reset, resetButtonX, resetButtonY, resetButtonSize, resetButtonSize);

        noFill();
        stroke(255);
        strokeWeight(2);
        rect(videoX, videoY, videoWidth, videoHeight);

        let overSelectionBox = false;

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
                let boxY = startY + i * (eyeBoxSize + eyeBoxPadding); // if the mouse inside the box
                if (mouseX >= boxX && mouseX <= boxX + eyeBoxSize &&
                    mouseY >= boxY && mouseY <= boxY + eyeBoxSize) {
                    overSelectionBox = true;
                    break; //terminate loop
                }
            }
        }
        //cursor at web tool, cursor not at web normal
        let overWebcam = mouseX >= videoX && mouseX <= videoX + videoWidth &&
            mouseY >= videoY && mouseY <= videoY + videoHeight;

        if (overWebcam && !overSelectionBox && gif >= 0) {
            if (gif == 0) {
                imageMode(CENTER);
                image(gifs[0], mouseX, mouseY, 60, 60);
                imageMode(CORNER);
            } else if (gif == 1) {
                imageMode(CENTER);
                image(gifs[1], mouseX, mouseY, 60, 60);
                imageMode(CORNER);
            } else if (gif == 2) {
                imageMode(CENTER);
                image(gifs[2], mouseX, mouseY, 60, 60);
                imageMode(CORNER);
            } else if (gif == 3) {
                imageMode(CENTER);
                image(gifs[3], mouseX, mouseY, 60, 60);
                imageMode(CORNER);
            }
        } else if (overSelectionBox) {
            cursor(ARROW);
        } else {
            cursor(ARROW);
        }
        if (capture) {
            let webcamSection = get(videoX, videoY, videoWidth, videoHeight);
            // https://p5js.org/reference/p5/get/
            save(webcamSection, 'Dear Dream Self', 'png');
            //https://p5js.org/reference/p5.Image/save/

            takePicture = true;
            capture = false;
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
            fill(255, 248, 249);
            stroke(244, 194, 194);
            strokeWeight(3);
        } else {
            fill(255);
            stroke(244, 194, 194);
            strokeWeight(1);
        }
        rect(boxX, boxY, noseBoxSize, noseBoxSize);
        // original eyes
        if (i == 0) {
            fill(0);
            textAlign(CENTER, CENTER);
            textFont('Indie Flower');
            textSize(10);
            text("original", boxX + noseBoxSize / 2, boxY + noseBoxSize / 2);
            textAlign(LEFT, BASELINE);
        } else {
            imageMode(CORNER); // preview tool
            let img = noseImages[i];
            let imgAspect = img.width / img.height;
            let displayWidth, displayHeight; //keep the porportion of the img

            if (imgAspect > 1) {
                displayWidth = noseBoxSize * 0.9;
                displayHeight = displayWidth / imgAspect;
            } else {
                displayHeight = noseBoxSize * 0.9;
                displayWidth = displayHeight * imgAspect;
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
            fill(255, 248, 249);
            stroke(244, 194, 194);
            strokeWeight(3);
        } else {
            fill(255);
            stroke(244, 194, 194);
            strokeWeight(1);
        }
        rect(boxX, boxY, eyeBoxSize, eyeBoxSize);

        if (i == 0) {
            textAlign(CENTER, CENTER);
            textSize(10);
            textFont('Indie Flower');
            fill(0);
            text('original', boxX + eyeBoxSize / 2, boxY + eyeBoxSize / 2);
            textAlign(LEFT, BASELINE);
            // from https://p5js.org/reference/p5/text/ and more google source
        } else {
            imageMode(CORNER);
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
            document.getElementById("title").classList.remove("text");
            document.getElementById("tool-info").classList.remove("text");
            bgm.loop();
            //javascript
        }
    } else {
        if (!warningShown && !warningOpen) {
            warningShown = true;
            openWarning();
            return;
        }

        if (mouseX >= freezeX && mouseX <= freezeX + freezeSize &&
            mouseY >= freezeY && mouseY <= freezeY + freezeSize) {
            if (firstEnter == true) {
                gameStart.play();
                firstEnter = false;
            }
            paused = !paused;
            if (paused) {
                pausedVideo = video.get();
            }
            select.play();
            return;
        }

        if (mouseX >= cameraX && mouseX <= cameraX + cameraSize &&
            mouseY >= cameraY && mouseY <= cameraY + cameraSize) {
            if (takePicture) {
                takePicture = false;
                cameraSound.play();

                // capture next frame
                capture = true;
            } else {
                takePicture = true;
                cameraSound.play();
            }
            return;
        }



        if (mouseX >= resetButtonX && mouseX <= resetButtonX + resetButtonSize &&
            mouseY >= resetButtonY && mouseY <= resetButtonY + resetButtonSize) {
            showWebcam = false; //go back to the rabbit
            gif = -1; //no tool selected
            //default
            eyeSize = 1;
            noseSize = 1;
            lipsScale = 1;
            lipsStroke = 4;
            //original
            eyeImage = 0;
            noseImage = 0;
            eyebrowSelected = false;
            lipsVisible = false;
            paused = false;
            sizeIncreased = false;
            sizeDecreased = false;
            takePicture = true;
            bgm.stop();
            document.getElementById("title").classList.add("text");
            document.getElementById("tool-info").classList.add("text");
            select.play();
            return;
            //javascript
        }
        // tool selection buttons
        if (mouseX >= tool1X && mouseX <= tool1X + toolButtonSize &&
            mouseY >= tool1Y && mouseY <= tool1Y + toolButtonSize) {
            gif = 0;
            sizeIncreased = false;
            sizeDecreased = false;
            clickSound.play();
            return;
        }

        if (mouseX >= tool2X && mouseX <= tool2X + toolButtonSize &&
            mouseY >= tool2Y && mouseY <= tool2Y + toolButtonSize) {
            gif = 1;
            sizeIncreased = false;
            sizeDecreased = false;
            clickSound.play();
            return;
        }

        if (mouseX >= tool3X && mouseX <= tool3X + toolButtonSize &&
            mouseY >= tool3Y && mouseY <= tool3Y + toolButtonSize) {
            gif = 2;
            clickSound.play();
            return;
        }

        if (mouseX >= tool4X && mouseX <= tool4X + toolButtonSize &&
            mouseY >= tool4Y && mouseY <= tool4Y + toolButtonSize) {
            gif = 3;
            lipsVisible = true;
            clickSound.play();
            return;
        }
        // use plus and minus to control
        if (gif == 0 || gif == 1) {
            // plus
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
                        // minimum 0.2
                        if (noseSize > 0.2) {
                            noseSize = noseSize - 0.2; // shrink
                            if (noseSize <= 0.2) {
                                sizeDecreased = true; // reached min then tint minus
                            }
                        } else {
                            // already at min then just tint, no shrinking
                            sizeDecreased = true;
                        }
                    } else if (gif == 1) {
                        // minimum 0.5
                        if (eyeSize > 0.5) {
                            eyeSize--; // shrink
                            if (eyeSize <= 0.5) {
                                sizeDecreased = true; // reached min then tint minus
                            }
                        } else {
                            // already at min then just tint, no shrinking
                            sizeDecreased = true;
                        }
                    }
                    sizeSound.play();
                }
                return;
            }

        }
        //eye
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
        // eyebrow
        if (gif == 2) {
            let dBrown = dist(mouseX, mouseY, brownCircleX, brownCircleY);
            if (dBrown < circleSize / 2) {
                eyebrowColor = "#964B00";
                eyebrowSelected = true;
                select.play();
                return;
            }

            let dGrey = dist(mouseX, mouseY, greyCircleX, greyCircleY);
            if (dGrey < circleSize / 2) {
                eyebrowColor = "#8f8f8e";
                eyebrowSelected = true;
                select.play();
                return;
            }
        }
        //lips
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
// different key different tool
function keyPressed() {
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
        lipsVisible = true;
        clickSound.play();
    }
}

function openWarning() {
    let warningg = document.getElementById("warning");
    if (warningg) {
        warningg.classList.remove("hidden");
        warningOpen = true;
        warning.play();
    }
    // javascript
}

function closeWarning() {
    let warningg = document.getElementById("warning");
    if (warningg) {
        warningg.classList.add("hidden");
        warningOpen = false;
    }
    // javascript
}

// when the user clicks yes
function confirmWarning() {
    closeWarning();
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

// chatGPT debug