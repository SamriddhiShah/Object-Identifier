video="";
objects=[];
document.getElementById("status").innerHTML="Click on the start button!";
status = "";
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects!!";

}
function preload(){
video=createVideo('video.mp4');


}

function setup(){
canvas=createCanvas(400,400);
canvas.center();
video.hide();
}

function draw(){
   image(video,0,0,400,400);

   if (status!=""){
       document.getElementById("status").innerHTML="Object Detected!";
       objectDetector.detect(video,gotResult);
       console.log(objects.length);
       document.getElementById("no-items").innerHTML=" "+objects.length;
      
       for(i=0;i<objects.length;i++){
       fill('#F08080');
       noFill();
       stroke('#F08080');
       text(objects[i].label+" "+floor(objects[i].confidence*100)+"%",objects[i].x, objects[i].y);
       rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
     
       
    }
   }
}



function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    video.volume(0);
    video.speed(1);
    video.loop();

}

function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
    objects=result;
    console.log(objects);
    }
}