var trex, Imgtrexrunning, trexcollide, ground, Imgground, invisibleGround;

function preload(){
Imgtrexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");
trexcollide = loadImage("trex_collided.png");
Imgground = loadImage("ground2.png");  
}

function setup() {
  createCanvas(400, 400);
  trex = createSprite(200,360,20,40);
  trex.addAnimation("Run",Imgtrexrunning);
  trex.scale = 0.5;
  
  ground = createSprite(200,380,400,20);
  ground.addImage(Imgground);
  
  invisibleGround = createSprite(200,390,400,20);
  invisibleGround.visible = false;
}

function draw() {
  background(220);
  if(keyDown("space")){
  trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY +0.8;
  trex.collide(invisibleGround);
  
  ground.velocityX = -5;
  
  if(ground.x <0){
  ground.x = ground.width/2;
  }
  
drawSprites();
}