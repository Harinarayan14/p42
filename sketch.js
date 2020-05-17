var player;
var col = "green";
var health = 200;
var score = 0;
var laser = [];
var shoot;
var bubble =[];


function setup() {
  canvas = createCanvas(600,600);
  player = createSprite(300,560,30,30);
  b1 = createSprite(random(30,560),random(-30,-100),20,20);
  b2 = createSprite(random(30,560),random(-30,-100),20,20);
  b3 = createSprite(random(30,560),random(-30,-100),20,20);
  b4 = createSprite(random(30,560),random(-30,-100),20,20);
  b5 = createSprite(random(30,560),random(-30,-100),20,20);
  b1.velocityY = 2;
  b2.velocityY = 2.2;
  b3.velocityY = 2.4;
  b4.velocityY = 2.6;
  b5.velocityY = 2.8;
  bubble = [b1,b2,b3,b4,b5];
}

function draw() {
  background(255);
  player.shapeColor = col;
  console.log(player);
  fill(0);
  text("Health:" + health,player.x -20,590);  
  text("Score:" + score,5,20);
  if(player.x <0){
    player.x = 585;
  }
  if(player.x >600){
    player.x = 15;
  }
  if(keyIsDown(LEFT_ARROW)){
    player.velocityX = -4;
    console.log("h");
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.velocityX = 4;
  }
  if(keyIsDown(UP_ARROW)){
  shoot = createSprite(player.x,player.y,2,10);
    shoot.velocityY = -5;
    shoot.shapeColor = col;
    laser.push(shoot);
  }
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
    if(laser[i].y<10){
      laser[i].destroy();
    } 
    for(var j =0;j<bubble.length;j++){
      if(bubble[j].y>600){
       bubble[j].x = random(50,560);
       bubble[j].y = random(-100,-200);
      }
     if(collide(laser[i],bubble[j])){
       laser[i].destroy();
       bubble[j].x = random(50,560);
       bubble[j].y = random(-100,-200);
       score ++;
 
     }
     if(collide(player,bubble[j])){
      health = health- Math.round(random(3,7));
      console.log("h");
      bubble[j].x = random(50,560);
      bubble[j].y = random(-100,-200);
     }
    }
  }
 }



 function collide(a,b){
  
  if ((b.x - a.x <= b.width/2 + a.width/2 )
  &&(a.x - b.x <= b.width/2 + a.width/2 )
  &&(b.y - a.y <= b.height/2 + a.height/2 )
  &&(a.y - b.y <= b.height/2 + a.height/2 )){
    return true

    console.log("he");
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
  if(health >160){
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

}