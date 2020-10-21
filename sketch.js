var player;
var col = "green";
var health = 200;
var score = 0;
var laser = [];
var shoot;
var bubble =[];
var ammo = 100;
var mode = "Fast";
var adap = 1;
var com =0;
var healthP=100;
var bulletS=0;
var accuracy;
var accuracyCol ="";

function setup() {
  canvas = createCanvas(600,600);
  player = createSprite(300,560,30,30);
  b1 = createSprite(random(30,560),random(-30,-100),20,20);
  b2 = createSprite(random(30,560),random(-30,-100),20,20);
  b3 = createSprite(random(30,560),random(-30,-100),20,20);
  b4 = createSprite(random(30,560),random(-30,-100),20,20);
  b5 = createSprite(random(30,560),random(-30,-100),20,20);
  bubble = [b1,b2,b3,b4,b5];
}

function draw() {
  background(255);
  console.log(mode);
  player.shapeColor = col;
  adap= adap+0.0005;
  console.log(adap);
  
  b1.velocityY = adap;
  b2.velocityY = adap+0.2;
  b3.velocityY = adap+0.4;
  b4.velocityY = adap+0.6;
  b5.velocityY = adap+0.8;
  if(adap>5){
    adap=5;
  }
  com = score*100/250;
  healthP = health/2;
  accuracy= Math.round(score*100/bulletS);
  fill(col);
  text("Health:" + health,540,20); 
  text("Health %: "+ healthP ,515,40);
  fill(accuracyCol);
  text("Accuracy: "+accuracy+" %",5,580);
  fill(0); 
  text("Score:" + score,5,20);
  text("Bullets: "+ ammo, 5,540);
  text("Mode: "+mode,535,580);
  text("Complete: "+ com +" %",5,60)
  text("Target: 250",5,40);
  text("Bullet Shot: "+ bulletS ,5,560);
  textSize(20)
  text("Instructions",100,100);
  text("Press Up arrow key to shoot.",100,130);
  text("Press Left and Right arrow keys to move.",100,160);
  text("Press Down arrow key to stop.",100,190);
  text("Don't allow enemies to collide with player or reach base.",100,220);
  text("Press Space Bar to toggle between fast and aim modes.",100,250);
  if(player.x <0){
    player.x = 585;
  }
  if(player.x >600){
    player.x = 15;
  }
  if(keyIsDown(LEFT_ARROW)){
    player.velocityX = -4;
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.velocityX = 4;
  }
  if(mode==="Fast"){
    if(keyIsDown(UP_ARROW) && ammo>0){
    shoot = createSprite(player.x,player.y,2,10);
      shoot.velocityY = -5;
      shoot.shapeColor = col;
      laser.push(shoot);
      ammo =ammo -1;
      bulletS = bulletS+1;
    }}
    
  if(keyIsDown(DOWN_ARROW)){
    player.velocityX =0;
  }
  goal();
  opponent();
  colorChange();

  drawSprites();
}

function opponent(){
  for(var i =0;i<laser.length;i++){
    if(laser[i].y<50){
      laser[i].y=10000;
      laser[i].x =10000;
    } 
    for(var j =0;j<bubble.length;j++){
      if(bubble[j].y>600){
       bubble[j].x = random(50,560);
       bubble[j].y = random(-100,-200);
       health =health-3;
      }
     if(collide(laser[i],bubble[j])){
       laser[i].destroy();
       laser[i].x =10000;
       laser[i].y = 10000;
       bubble[j].x = random(50,560);
       bubble[j].y = random(-100,-200);
       score =score+1;
       ammo=ammo+1;
       health=health+1
 
     }
     if(collide(player,bubble[j])){
      health = health- Math.round(random(3,7));
      bubble[j].x = random(50,560);
      bubble[j].y = random(-100,-200);
     }
    }
  }
 }

function keyPressed(){
  if(keyCode===32){
    if(mode==="Fast"){
      mode="Aim"
      console.log("Hi")
    }
    else if(mode==="Aim"){
      mode ="Fast"
    }
  }
  if(mode==="Aim"){
  if(keyCode===38 && ammo>0){
    shoot = createSprite(player.x,player.y,2,10);
      shoot.velocityY = -5;
      shoot.shapeColor = col;
      laser.push(shoot);
      ammo =ammo -1;
      bulletS = bulletS+1;
    }}
}

 function collide(a,b){
  
  if (((b.x - a.x <= b.width/2 + a.width/2 )
  &&(a.x - b.x <= b.width/2 + a.width/2 ))
 &&((b.y - a.y <= b.height/2 + a.height/2 )
  &&(a.y - b.y <= b.height/2 + a.height/2 )) && a!==null && b!==null){
    return true

  }
}

function goal(){
  if (health<=0){
    player.destroy();
    
    fill(255,0,0);
    textSize(50);
    text("GameOver!!!",200,200);
    textSize(50);
    text("Your Score is " + score +".",100,400);
    bubble =[];
    b1.destroy();
    b2.destroy();
    b3.destroy();
    b4.destroy();
    b5.destroy();

  }
  if (score >= 250){
    player.destroy();
    fill(0,255,0);
    textSize(50);
    text("You Won!!!",200,200);

  }
}

function colorChange(){
  if(health >160 && health<250){
    col = "green";
  }
  if(health <161 && health>120){
    col = "yellow";
  }
  if(health <121 && health>80){
    col = "orange";
  }
  if(health <81 && health>40){
    col = "red";
  }
  if(health <41 && health>0){
    col = "black";
  }
   if(health>250){
    col="purple"
  }
  
  if(accuracy>80 && accuracy<98){
    accuracyCol = "green";
  }
  if(accuracy <80 && accuracy>60){
    accuracyCol = "yellow";
  }
  if(accuracy <60&& accuracy>40){
    accuracyCol = "orange";
  }
  if(accuracy <40 && accuracy>0){
    accuracyCol = "red";
  }
   if(accuracy>98){
    accuracyCol="purple"
  }

}