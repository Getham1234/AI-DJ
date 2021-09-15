amazing_grace = ""
oh_when_the_saints = ""
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;

function preload(){
    amazing_grace = loadSound("2a Amazing Grace (Demo).mp3");
    oh_when_the_saints = loadSound("3a Oh When the Saints (Demo).mp3");
}

function stop(){
    amazing_grace.stop();
    oh_when_the_saints.stop();
    document.getElementById("song_name").innerHTML = "Song Name";
}

function setup(){
    canvas = createCanvas(600, 500)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("Posenet was Initialized.");
}

function draw(){
image(video, 0, 0, 600, 500);
fill("#FF0000");

if(leftWristScore > 0.2){
    circle(leftWristX, leftWristY, 40);
    oh_when_the_saints.stop();

    if(!amazing_grace.ended){
        amazing_grace.play();
        document.getElementById("song_name").innerHTML = "Amazing Grace";
    }
}

    if(rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 40);
        amazing_grace.stop();
    
        if(!oh_when_the_saints.ended){
            oh_when_the_saints.play();
            document.getElementById("song_name").innerHTML = "Oh When The Saints";
        }
}
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;

        console.log("The score for the left wrist is " + leftWristScore + "and the score for the right wrist is " + rightWristScore + ".")

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(leftWristX, leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(rightWristX, rightWristY);
    }
}