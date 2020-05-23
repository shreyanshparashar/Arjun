var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["421e7369-4f53-4b2a-9cb3-947c89794eaa","c71cf7e6-4287-4b67-9242-4d3711798ff2","481a1f12-25dc-4a97-957a-cb4ee8aca5eb","2ef762ea-f3ab-4136-9121-abe1c05b177c"],"propsByKey":{"421e7369-4f53-4b2a-9cb3-947c89794eaa":{"name":"Smiley","sourceUrl":null,"frameSize":{"x":49,"y":49},"frameCount":1,"looping":true,"frameDelay":12,"version":"gZP2kRqnzC8A6jUMtL6a2qN7AHYLD1Hb","loadedFromSource":true,"saved":true,"sourceSize":{"x":49,"y":49},"rootRelativePath":"assets/421e7369-4f53-4b2a-9cb3-947c89794eaa.png"},"c71cf7e6-4287-4b67-9242-4d3711798ff2":{"name":"Giraffe","sourceUrl":null,"frameSize":{"x":49,"y":49},"frameCount":1,"looping":true,"frameDelay":12,"version":"AHiTmZmA4hSVW5.7cHGAlFAzYP6TfcNw","loadedFromSource":true,"saved":true,"sourceSize":{"x":49,"y":49},"rootRelativePath":"assets/c71cf7e6-4287-4b67-9242-4d3711798ff2.png"},"481a1f12-25dc-4a97-957a-cb4ee8aca5eb":{"name":"Ground","sourceUrl":null,"frameSize":{"x":1000,"y":2},"frameCount":1,"looping":true,"frameDelay":12,"version":"Xdz_cOMVyLoQe3YJWg1eBAPIimk9e6tD","loadedFromSource":true,"saved":true,"sourceSize":{"x":1000,"y":2},"rootRelativePath":"assets/481a1f12-25dc-4a97-957a-cb4ee8aca5eb.png"},"2ef762ea-f3ab-4136-9121-abe1c05b177c":{"name":"cow","sourceUrl":null,"frameSize":{"x":49,"y":49},"frameCount":1,"looping":true,"frameDelay":12,"version":"Hi.Y0RUrz1rsXsNf1Reeiap7G5illtYH","loadedFromSource":true,"saved":true,"sourceSize":{"x":49,"y":49},"rootRelativePath":"assets/2ef762ea-f3ab-4136-9121-abe1c05b177c.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner = createSprite(200,380,20,50);
runner.setAnimation("Giraffe");
runner.scale = 0.5;
runner.x = 50;

runner.debug = false;
runner.setCollider("rectangle",0,0,200,50);

var ground = createSprite(200,380,400,20);
ground.setAnimation("Ground");
ground.x = ground.width /2;

var ObstaclesGroup = createGroup();
textSize(18);
textFont("Georgia");
textStyle(BOLD);

var count = 0;

function draw() {

background("white");

text("Score: "+ count, 250, 100);

if(gameState === PLAY){
ground.velocityX = -(6 + count/100);
count = Math.round(World.frameCount/4);
console.log(ground.velocityX);

if (ground.x < 0){
ground.x = ground.width/2;
}

if(keyDown("space") && runner.y >= 359){
runner.velocityY = -12 ;
playSound("assets/category_jump/retro_game_classic_jump_18.mp3");
  }

if (count>0 && count%100 === 0){
      playSound("assets/category_animals/cow.mp3");
    }
runner.velocityY = runner.velocityY + 0.8;

spawnObstacles();

if(ObstaclesGroup.isTouching(runner)){
//gameState = END;
//playSound("assets/category_explosion/8bit_explosion.mp3");
  runner.velocityY = -5;
}
}
else if(gameState === END) {

ground.velocityX = 0;

runner.velocityY = 0;

ObstaclesGroup.setVelocityXEach(0);

ObstaclesGroup.setLifetimeEach(-1);

}

runner.collide(ground);

drawSprites();
}

function spawnObstacles() {
if(World.frameCount % 60 === 0) {
var obstacle = createSprite(400,365,10,40);

obstacle.velocityX = -6;

obstacle.setAnimation("Smiley");

obstacle.scale = 0.5;

obstacle.lifetime = 70;

ObstaclesGroup.add(obstacle);
}
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
