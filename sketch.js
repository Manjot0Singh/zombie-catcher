
var SERVE = 0;
var PLAY = 1;
var END = 2;

var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;
var bulletImg;

var gameState = "fight"
var score = 0;
var kills = 50;

var ground;
var sky;
function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/3 lvl bg.jpg")
bulletImg = loadImage("assets/bullet.png")
}

function setup() {
 
  createCanvas(windowWidth,windowHeight);

  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   
   player.setCollider("rectangle",0,0,200,400)


   //creating sprites to depict lives remaining
   heart = createSprite(displayWidth-150,40,20,20)
   heart.visible = false
    heart.addImage("heart3",heart3Img)
    heart.scale = 0.4

   
   ground = createSprite(windowWidth/2,windowHeight-20,windowWidth,10)
   ground.visible = false;
   

   sky = createSprite(windowWidth/2,10,windowWidth,10)
   sky.visible = false;

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(bgImg); 

textSize(20);
fill("BLACK");
 text("score: "+score,30,30);

player.collide(ground);
player.collide(sky);

if(gameState === "fight"){
 
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 30
  bullet.addImage(bulletImg);
bullet.scale = 0.1;


  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "bullet"
    
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  score = score + 5 ;
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
       kills = 50-1;
        }   
  }
}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 gameState = "lost";
 }
}

if(score>300){
  gameState = "won";
}



enemy();
}

drawSprites();

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(200)
  fill("red")
  text("You Lost ",300,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40);

    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -6;
    
    zombie.setCollider("rectangle",0,0,400,600);
   
    zombie.lifetime = 400;
   zombieGroup.add(zombie);


  }

}

