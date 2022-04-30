var bg
var ig
var girl, sadgirl
var play = 1
var end = 0
var gameState = play
var ghost,runningghost
var ghostGroup, fb1Group, fb2Group, fb3Group, f4Group
var score = 0
var bgsound


function preload(){
bg = loadImage("images/forest.jpg");
darkbg = loadImage("images/hauntedhouse.jpg");
girl = loadAnimation("images/girl/title00.png","images/girl/title01.png","images/girl/title02.png","images/girl/title03.png","images/girl/title04.png","images/girl/title05.png","images/girl/title06.png","images/girl/title07.png")
runningghost = loadAnimation("images/ghost/tile000.png","images/ghost/tile001.png","images/ghost/tile002.png","images/ghost/tile003.png","images/ghost/tile004.png")
rain1 = loadAnimation("images/obs/tile000.png","images/obs/tile001.png","images/obs/tile002.png","images/obs/tile012.png")
rain2 = loadAnimation("images/obs/tile006.png","images/obs/tile007.png","images/obs/tile008.png","images/obs/tile031.png")
rain3 = loadAnimation("images/obs/tile009.png","images/obs/tile010.png","images/obs/tile011.png")
rain4 = loadAnimation("images/obs/tile057.png","images/obs/tile058.png","images/obs/tile059.png","images/obs/tile070.png","images/obs/tile071.png")
sadgirl = loadAnimation("images/sadgirl/tile000.png","images/sadgirl/tile001.png","images/sadgirl/tile002.png","images/sadgirl/tile003.png","images/sadgirl/tile004.png","images/sadgirl/tile005.png","images/sadgirl/tile006.png","images/sadgirl/tile008.png","images/sadgirl/tile009.png","images/sadgirl/tile010.png","images/sadgirl/tile011.png","images/sadgirl/tile012.png","images/sadgirl/tile013.png","images/sadgirl/tile014.png")
bgsound = loadSound("sounds/bgsound.wav")
}

function setup(){
createCanvas(1200,800);
ig = createSprite(600,800,1200,100);
ig.visible = false;

bgsprite = createSprite(600,400,1200,800);
bgsprite.addImage(bg);
bgsprite.scale = 3;
bgsprite.velocityX = -2;

runninggirl = createSprite(500,700,50,100);
runninggirl.addAnimation("running",girl);
runninggirl.addAnimation("die", sadgirl);
runninggirl.setCollider("rectangle",0,0,70,150)

ghostGroup = new Group();
fb1Group  = new Group();
fb2Group  = new Group();
fb3Group = new Group();
fb4Group = new Group();
}

function draw(){


background("black");
 if (gameState === play){

     bgsound.play();
    //ig.velocityX = -4
    if (ig.x<0){
        ig.x = ig.width/2
     }

     if(bgsprite.x < 290){
         bgsprite.x = 600;
     }

    if (keyDown("space")&& runninggirl.y>=200){
        runninggirl.velocityY = -13 
    }
    runninggirl.velocityY = runninggirl.velocityY+0.8
    if (keyDown("LEFT_ARROW")){
        runninggirl.x = runninggirl.x-5
    }
    if (keyDown("RIGHT_ARROW")){
        runninggirl.x = runninggirl.x+5
    }
    spawnobs();

    score = score + Math.round(frameCount/60)
    if(ghostGroup.isTouching(runninggirl) ||
     fb1Group.isTouching(runninggirl) || 
     fb2Group.isTouching(runninggirl) || 
     fb3Group.isTouching(runninggirl) || 
     fb4Group.isTouching(runninggirl)){
        gameState = end;
    }
 }
else if (gameState === end){
//bgsprite.velocityX = -20;
bgsprite.remove();
//ghostGroup.velocityX = - 15;
ghostGroup.removeSprites();
runninggirl.velocityY = 0
runninggirl.changeAnimation("die", sadgirl)
runninggirl.scale = 2;
background(darkbg);

}
runninggirl.collide(ig)
drawSprites();
textSize(35)
fill("white")
stroke(50)
strokeWeight(5)
text("Score: "+score,1000,100)
}

function spawnobs(){
if(frameCount %350===0){
    var ghost = createSprite(1250,700,50,50)
    ghost.setCollider("rectangle", 0,0,100, 150);
    ghost.velocityX = -4 
    ghost.scale = 3
    ghost.addAnimation("run",runningghost)
    ghostGroup.add(ghost);

    var fireball1 = createSprite(50,-10,20,20)
    fireball1.setCollider("rectangle",0,0,20,20)
    fireball1.scale = 3
    fireball1.velocityY = 4
    fireball1.addAnimation("r1",rain1)
    fb1Group.add(fireball1);

    var fireball2 = createSprite(400,-10,20,20)
    fireball2.setCollider("rectangle",0,0,20,20)
    fireball2.scale = 3
    fireball2.velocityY = 4
    fireball2.addAnimation("r2",rain2)
    fb2Group.add(fireball2);

    var fireball3 = createSprite(750,-10,20,20)
    fireball3.setCollider("rectangle",0,0,20,20)
    fireball3.scale = 3
    fireball3.velocityY = 4
    fireball3.addAnimation("r3",rain3)
    fb3Group.add(fireball3);

    var fireball4 = createSprite(1100,-10,20,20)
    fireball4.setCollider("rectangle",0,0,20,20)
    fireball4.scale = 3
    fireball4.velocityY = 4
    fireball4.addAnimation("r4",rain4)
    fb4Group.add(fireball4);
}
}