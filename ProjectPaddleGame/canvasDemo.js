

window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx; // This is a better name for a global variable
var balls = new Array();
var paddle = new Paddle();

//using count as a score variable
var count = 0;

function init(){
  // get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0, 0, 0,0.7)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  for(var i = 0; i < 5; i++){
    balls.push(new Ball());
  }

  //checking the x value of the mouse on the canvas
  canvas.addEventListener('mousemove', function(){
    mouseX = event.offsetX;
  }, false);

  lengs = balls.length;
  animate(); // Calling animate function
}

// To do::
//  1. Declare and init variables x, y, dx, dy, radius;

function animate(){
  //loops animate function
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //render and update for balls and paddle
  for (var i = 0; i < balls.length; i++){
    //render and update a single ball
    var ball = balls[i];
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI*2);
    ctx.fillStyle = ball.c;
    ctx.fill();
    ctx.strokeStyle = ball.c;
    ctx.stroke();
    //check edges
    if(ball.x + ball.rad >= innerWidth-ball.dx || ball.x -ball.rad <= 0){
      ball.dx = -(ball.dx);
    }
    if(ball.y + ball.rad >= innerHeight-ball.dy || ball.y - ball.rad <= 0){
      ball.dy = - (ball.dy/1.03);
    }
    ball.x += ball.dx
    ball.y += ball.dy;
    ball.dy += 0.6;

    //checks collisions between ball and paddle
    if((ball.y - ball.rad) - (paddle.y - paddle.h) >= 0
    && (ball.y + ball.rad) - (paddle.y + paddle.h) <= 0
    && (ball.x - ball.rad) - (paddle.x - paddle.w) >= 0
    && (ball.x + ball.rad) - (paddle.x + paddle.w) <= 0){
      //if the balls are moving upward (positive velocity) the game resets and 5 more balls are put into the array
      if (ball.dy < 0){
        balls.splice(0, balls.length);
        lengs = lengs + 5;
        for(var i = 0; i < lengs; i++){
          balls.push(new Ball());
        }
        count = 0;
      }
      //if balls are moving downward (negative velocity) then they are spliced
      if (ball.dy > 0){
        balls.splice(i, 1);
        count++;
      }
    }
  }
  //render and update paddle
  ctx.beginPath();
  ctx.rect(paddle.x-paddle.w, paddle.y-paddle.h, paddle.w*2, paddle.h*2);
  ctx.fillStyle = paddle.c;
  ctx.fill();
  ctx.strokeStyle = paddle.c;
  ctx.stroke();
  paddle.x = mouseX;

  //scoreboard
  ctx.font = "30px Comic Sans MS";
  ctx.fillText("Score: " + count, 10, 50);

  if (balls.length === 0){
    ctx.fillText("Score: " + count + "                                                                    n  i  c  e", 10, 50);
  }
}

function Ball(){
  //declares ball variables
  this.x = Math.random()*(innerWidth-40)+20;
  // this.y = Math.random()*innerHeight + 100;
  // this.x = 1000;
  this.y = 100;
  this.dx = Math.random()*10-5;
  this.dy = Math.random()*10-5;
  this.rad = Math.random()*10+10;
  this.c = 'rgba(' + Math.floor(Math.random()*225) + ',' + Math.floor(Math.random()*225) + ',' + Math.floor(Math.random()*225) + ',' + 1 + ')';
}

function Paddle(){
  //declares initial position, width, height, and color for the paddle
  this.x = innerWidth/2;
  this.y = innerHeight/2 + innerHeight/4;
  this.w = 125;
  this.h = 37.5;
  this.c = 'rgba(' + 255 + ',' + 255 + ',' + 255 + ',' + 1 + ')';
}
