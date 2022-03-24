const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,background;

var canvas, angle, tower, ground, cannon;
var score = 0;
//VAR BALLS
var balls = [];

//var boats
var boats = [];

var boatAnimation = [];
var boatSpritedata, boatSpritesheet;

//BROKEN,WATER



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");
 
 
  waterSplashSpritedata = loadJSON("assets/waterSplash/waterSplash.json");
  waterSplashSpritesheet = loadImage("assets/waterSplash/waterSplash.png");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  //ANGLE
  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  //crear objeto cannon
  cannon= new Cannon (180, 110, 130, 100, angle);
  //cannonBall = new CannonBall(cannon.x, cannon.y);

  var boatFrames = boatSpritedata.frames;
 
  //boat = new Boat(width-79,height-60, 170, 170, -80);


  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }


  //BROKEN BOATFRAMES
  //for (var i = 0; i < brokenBoatFrames.length; i++) {
  
 // }

 /* var waterSplashFrames = waterSplashSpritedata.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }*/


}

function draw() {
  image(backgroundImg, 0, 0, width, height);
  //background(189);
 
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  //rect(tower.position.x, tower.position.y, 160,310);

  push();
  imageMode(CENTER);
  //rect(tower.position.x, tower.position.y, 160,310);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  //for
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i],i);
    collisionWithBoat(i);
  }

  //display de cannon para verlo en pantalla
  cannon.display();
  //cannonBall.display();

    //Matter.Body.setVelocity(boat.body,{x:-0.9, y:0})
  //boat.display();

  //showBoats();
  showBoats();



}

function showCannonBalls(ball,index) {
  //condicion
  if (ball) {
    ball.display();
    //animate ball

    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
    
  }


}

function showBoats() {
  if (boats.length > 0) {
    if (boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300) {

    //POSITION
    var positions = [-40, -60, -70, -20];
    var position = random(positions);
    var boat = new Boat(width, height - 100, 170, 170, position,boatAnimation);

      //PUSH
      boats.push(boat);

    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
         
       //X,Y
       x: -0.9,
       y: 0
        });

        boats[i].display();
        boats[i].animate();
        
     } 
    }
  } 
  else {

  //BOAT
  var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
  boats.push(boat);

  }
}





function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    // cannonBall.shoot();
    balls[balls.length - 1].shoot();
    
  }
}

function collisionWithBoat(index) {
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      if (collision.collided) {
        boats[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }



    }
  }
}





function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}



