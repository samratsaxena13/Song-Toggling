var aeHaseeno = "";
var yehJawani = "";

var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;
var statLeftWrist = "";
var statRightWrist = "";


function preload() {
   aeHaseeno = loadSound("ae-haseeno.mp3");
    yehJawani = loadSound("yeh-jawani.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(440, 160);

    video = createCapture(VIDEO);
    video.hide();
    setTimeout(function(){
      poseNet = ml5.poseNet(video, modelLoaded);
      poseNet.on('pose', gotPoses);
    } ,2000);
}

function modelLoaded() {
    console.log('Model Loaded!');
}

function gotPoses(results)
{
  if(results.length > 0) {
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    scoreLeftWrist = results[0].pose.keypoints[9].score + 0.07;
    scoreRightWrist = results[0].pose.keypoints[10].score + 0.07;
  }
}

function draw() {
  image(video, 0, 0, 400, 400); 
  statLeftWrist = aeHaseeno.isPlaying();
  if(scoreLeftWrist > 0.099){
    yehJawani.stop();
    if(statLeftWrist == false){
     aeHaseeno.play();
      document.getElementById("song-name").innerHTML = "Song Name: Bachna Ae Haseeno"
    }
  }
  statRightWrist = yehJawani.isPlaying();
  if(scoreRightWrist > 0.099){
   aeHaseeno.stop();
    if(statRightWrist == false){
      yehJawani.play();
      document.getElementById("song-name").innerHTML = "Song Name: Yeh Jawaani Hai Dewaani"
    }
  }
}
