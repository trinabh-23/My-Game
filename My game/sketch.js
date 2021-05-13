const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var batConstraint
var engine, world;
var ballSprite

var gameState="start"




function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    frame1=loadAnimation("Images/Batsman/b1.png","Images/Batsman/b2.png","Images/Batsman/b3.png","Images/Batsman/b4.png","Images/Batsman/b5.png","Images/Batsman/b6.png","Images/Batsman/b7.png","Images/Batsman/b8.png","Images/Batsman/b9.png","Images/Batsman/b10.png","Images/Batsman/b11.png","Images/Batsman/b12.png")
    frame2=loadAnimation("Images/Batsman/b12.png")
   
}

function setup(){
    var canvas = createCanvas(displayWidth,displayHeight);
    engine = Engine.create();
    world = engine.world;
    ground=Bodies.rectangle(displayWidth/2,displayHeight,displayWidth,20,{isStatic:true})
    World.add(world,ground)
    batsman=Bodies.rectangle(displayWidth/8,displayHeight-150,100,100,{isStatic:true,restitution:2})
    World.add(world,batsman)
    ball=Bodies.circle(displayWidth-10,displayHeight/2+40,10,{isStatic:true,restitution:0.9,density:1.3,friction:0.5})
    World.add(world,ball)
    bat=Bodies.rectangle(batsman.position.x,batsman.position.y+20,20,80)
    World.add(world,bat)
    var a=batsman.position.x
    var b=batsman.position.y
    var options={
        pointA:{x:170,y:668},
        bodyB:bat,
        stiffness:0.2,
        lenght:10,
    }
    batConstraint= Matter.Constraint.create(options)
    World.add(world,batConstraint)
    console.log(batsman)
    batsmanAnimation=createSprite(batsman.position.x,batsman.position.y)
    batsmanAnimation.addAnimation("animation",frame1)
    batsmanAnimation.addAnimation("static",frame2)
    ballSprite=createSprite(ball.position.x,ball.position.y,30,30)
    ballSprite.shapeColor="red"
    
}

function draw(){
    background(0);
    Engine.update(engine);
   // if(gameState==="start"){
     //   batsmanAnimation.changeAnimation("static")

                if(keyWentDown("space")){
                    //gameState="play"
                    batsmanAnimation.changeAnimation("animation")
                }else if(keyWentUp("space")){
                    batsmanAnimation.changeAnimation("static")
                }

        console.log("start")
    // }else if(gameState==="play"){
    //     batsmanAnimation.changeAnimation("animation")
    //     console.log("play")
    // }
    //strokeWeight(4);
   
    
    rectMode(CENTER)
    rect(ground.position.x,ground.position.y,displayWidth,40)
    //rect(batsman.position.x,batsman.position.y,100,100)
     //imageMode(CENTER)
     //image(frame1,batsman.position.x,batsman.position.y-90,480,300)
    
    // ellipseMode(RADIUS)
    // ellipse(ball.position.x,ball.position.y,10)
    // rect(bat.position.x+25,bat.position.y-90,80,20)
    ballSprite.x=ball.position.x
    ballSprite.y=ball.position.y
    if(keyDown("b")){
        Matter.Body.setStatic(ball,false)
// ballSprite.velocityX=-5
// ballSprite.velocityY=ball.velocityY+1
Matter.Body.setVelocity(ball,{x:-20,y:2})
    }
    ballSprite.debug=true
    batsmanAnimation.debug=true
    batsmanAnimation.setCollider("rectangle",0,0,100,200,-35)
    
ballSprite.bounceOff(batsmanAnimation)

if(ball.isTouching(batsman)){
Matter.Body.applyForce(ball,ball.position,{x:30,y:-30})
}

    drawSprites()
}
 
    /*function keyPressed(){

      else{
            //batsmanAnimation.addAnimation("animation",frame1)
            //batsmanAnimation.changeAnimation("animation",frame2)
           batsmanAnimation.visible=false;
    
        }

        



    }*/


