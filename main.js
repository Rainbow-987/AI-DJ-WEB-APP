/* 
○ Means variableName.setVolume(0.1) - Very low
○ Means variableName.setVolume(0.3) - Little low
○ Means variableName.setVolume(0.5) - Medium
○ Means variableName.setVolume(0.7) - Little high
○ Means variableName.setVolume(0.9) - High
○ Means variableName.setVolume(1) - Full volume



○ Means variableName.rate(0.5) - Very slow 0-100
○ Means variableName.rate(1) - Normal 100-200
○ Means variableName.rate(1.5) - Little fast 200-300
○ Means variableName.rate(2) - Twice as fast 300-400
○ Means variableName.rate(2.5) - Very fast 400 onwards

*/


var sound = "";
var left_Wrist_x = 0;

var left_Wrist_y = 0;

var right_Wrist_x = 0;
var right_Wrist_y = 0;

function preload() {
    sound = loadSound("music.mp3");
}


function setup() {
    canvas = createCanvas(500, 450);
    canvas.position(600, 200);
    background("teal");

    video = createCapture(VIDEO);
    video.hide();

    my_posenet = ml5.poseNet(video, model_loaded);
    my_posenet.on('pose', got_Poses);
}


function draw() {

    image(video, 0, 0, 500, 450);

    fill("red");
    stroke("red");
    circle(left_Wrist_x, left_Wrist_y, 40);
    circle(right_Wrist_x, right_Wrist_y, 40);

    if (right_Wrist_y >= 0 && right_Wrist_y < 100 ){

        sound.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed : 0.5x";
    }
    else if (right_Wrist_y >= 100 && right_Wrist_y < 200 ){

        sound.rate(1);
        document.getElementById("speed").innerHTML = "Speed : 1x";
    }
    else if (right_Wrist_y >= 200 && right_Wrist_y < 300 ){

        sound.rate(1.5);
        document.getElementById("speed").innerHTML = "Speed : 1.5x";
    }
    else if (right_Wrist_y >= 300 && right_Wrist_y < 400 ){

        sound.rate(2);
        document.getElementById("speed").innerHTML = "Speed : 2x";
    }
    else if (right_Wrist_y >= 400){

        sound.rate(2.5);
        document.getElementById("speed").innerHTML = "Speed : 2.5x";
    }

    round_left = floor(left_Wrist_y)
    new_vol = round_left / 450;
    sound.setVolume(new_vol);
    document.getElementById("volume").innerHTML = "Volume : "+ new_vol;

}


function play_Sound() {

    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}


function model_loaded() {

    console.log("PoseNet is loaded");

}

function got_Poses(results) {
 if(results.length>0){
    console.log(results);

    left_Wrist_x = results[0].pose.leftWrist.x;
    left_Wrist_y = results[0].pose.leftWrist.y;


    right_Wrist_x = results[0].pose.rightWrist.x;
    
    right_Wrist_y = results[0].pose.rightWrist.y;
 }

}