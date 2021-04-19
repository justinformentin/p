import winSound from '../sounds/win.mp3';
import brickSound from '../sounds/brick.mp3';
import paddleSound from '../sounds/paddle.mp3';
import loseLifeSound from '../sounds/loselife.mp3';
import gameOverSound from '../sounds/gameover.mp3';

export function brickBreakerGame() {
  var canvas;
  var ctx;
  var ballRadius = 10;
  var x;
  var y;
  var dx = 2;
  var dy = -2;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX;
  var rightPressed = false;
  var leftPressed = false;
  var score = 0;
  var lives = 2;
  var paddleRect;
  var bricks = [];
  var gameStarted = false;
  var gameCleared = false;
  var gameOver = false;
  // const BLUE = '#96c9dc';
  const BLUE = '#a9ccea';
  const DARK_BLUE = '#30667a';

  document.addEventListener('canvas:gameCleared', () => {
    !gameCleared && (gameCleared = true);
    ctx && ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  function playAudio(audioFile, volume){
    const audio = new Audio(audioFile);
    audio.volume = volume || 0.75;
    audio.play();
  }

  function gameStartCoords() {
    x = canvas.width / 2;
    y = canvas.height - 50;
    dx = 3;
    dy = -3;
    paddleX = (canvas.width - paddleWidth) / 2;
  }

  function collisionDetection() {
    bricks.forEach((b) => {
      if (
        b.status === 1 &&
        x > b.x &&
        x < b.x + b.width &&
        y > b.y &&
        y < b.y + b.height
      ) {
        dy = -dy;
        b.status = 0;
        score++;
        playAudio(brickSound);
        if (score === bricks.length) {
          gameOver = true;
          playAudio(winSound);
          drawOverlay('You Win');
        }
      }
    });
  }

  function drawBall() {
    let paddleOffsetHeight = 0;
    // if (renderedCount < 3) {
    //   paddleOffsetHeight = paddleHeight - 5;
    //   renderedCount++;
    // }
    ctx.beginPath();
    ctx.arc(x, y - paddleOffsetHeight, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = DARK_BLUE;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    paddleRect = {
      x: paddleX,
      y: canvas.height - paddleHeight - 30,
      width: paddleWidth,
      height: paddleHeight,
    };
    ctx.rect(paddleRect.x, paddleRect.y, paddleRect.width, paddleRect.height);

    ctx.fillStyle = DARK_BLUE;
    ctx.fill();
    ctx.closePath();
  }

  function roundedRect(x, y, width, height, radius) {
    radius = Math.min(Math.max(width - 1, 1), Math.max(height - 1, 1), radius);
    var rectX = x;
    var rectY = y;
    var rectWidth = width;
    var rectHeight = height;
    var cornerRadius = radius;

    ctx.lineJoin = 'round';
    ctx.lineWidth = cornerRadius;
    ctx.strokeRect(
      rectX + cornerRadius / 2,
      rectY + cornerRadius / 2,
      rectWidth - cornerRadius,
      rectHeight - cornerRadius
    );
    ctx.fillRect(
      rectX + cornerRadius / 2,
      rectY + cornerRadius / 2,
      rectWidth - cornerRadius,
      rectHeight - cornerRadius
    );
    // ctx.stroke();
    ctx.fill();
  }

  function drawBricks() {
    bricks.forEach((coord) => {
      if (coord.status === 1) {
        ctx.fillStyle = BLUE;
        ctx.strokeStyle = BLUE;
        roundedRect(coord.x, coord.y, coord.width, coord.height, 10);

        ctx.fillStyle = '#000000';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          coord.text,
          coord.x + coord.width / 2,
          coord.y + coord.height / 2
        );
      }
    });
  }

  function drawScore() {
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = DARK_BLUE;
    ctx.fillText('Score: ' + score, 38, canvas.height - 15);
  }

  function drawLives() {
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = DARK_BLUE;
    ctx.fillText('Lives: ' + lives, canvas.width - 45, canvas.height - 15);
  }

  function drawOverlay(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = DARK_BLUE;
    roundedRect(canvas.width / 2 - 100, canvas.height / 2 - 50, 200, 100);
    ctx.font = '16px Arial';
    ctx.fillStyle = DARK_BLUE;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  function draw() {
    if (!gameStarted) {
      gameStartCoords();
      gameStarted = true;
    }

    if (gameCleared) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      gameCleared = false;
    } else if (!gameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }

      if (y + dy < ballRadius) {
        dy = -dy;
        // console.log('y+dy<ballRadius', dy)
      } else if (y + dy > canvas.height - ballRadius - (paddleHeight + 20)) {
        // } else if (y + dy > paddleHeight) {
        // console.log('paddleHeight', paddleHeight)
        // console.log('y',y)
        if (x > paddleX && x < paddleX + paddleWidth && y > paddleHeight) {
          // if (intersectsPaddle([x, y], [paddleRect.x, paddleRect.y, paddleRect.width, paddleRect.height])) {
          dy = -dy;
          playAudio(paddleSound);
        } else {
          lives--;
          if (!lives) {
            gameOver = true;
            drawOverlay('Game Over');
            playAudio(gameOverSound);
          } else {
            playAudio(loseLifeSound);
            gameStartCoords();
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      x += dx;
      y += dy;
      !gameCleared && requestAnimationFrame(draw);
    }
  }

  function init(canv, context, coords) {
    // console.log('brickbreaker init canv', canv);
    canvas = canv;
    ctx = context;
    bricks = coords;
    x = canvas.width / 2;
    y = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2;
    lives = 2;
    score = 0;
    gameCleared = false;
    gameOver = false;

    // console.log('gameOIver', gameOver);
    const keyDownBase = (keyCode, bool) => {
      if (keyCode === 39) {
        rightPressed = bool;
      } else if (keyCode === 37) {
        leftPressed = bool;
      }
    };

    const keyDownHandler = (e) => keyDownBase(e.keyCode, true);

    const keyUpHandler = (e) => keyDownBase(e.keyCode, false);

    const canvasRect = canvas.getBoundingClientRect();
    function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft;
      const paddleHalf = paddleWidth / 2;
      if (relativeX > canvasRect.left && relativeX < canvasRect.right) {
        const newLoc = relativeX - canvasRect.left;
        const leftWallLimit = newLoc - paddleHalf >= 0;
        const rightWallLimit = newLoc <= canvas.width - paddleHalf;
        if (leftWallLimit && rightWallLimit) {
          paddleX = relativeX - canvasRect.left - paddleHalf;
        }
      }
    }
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    canvas.addEventListener('mousemove', mouseMoveHandler, false);

    draw();
  }

  return init;
}
