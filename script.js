// 初始化游戏变量
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restartBtn');
const restartBtn2 = document.getElementById('restartBtn2');
const gameOver = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const difficultySelect = document.getElementById('difficulty');

// 蛇的初始位置和大小
let snake = [{x: 200, y: 200}];
let direction = {x: 0, y: 0};
const snakeSize = 10;
let gameRunning = true;

// 食物的初始位置
let food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};

// 得分
let score = 0;

// 重新开始游戏
function restartGame() {
  snake = [{x: 200, y: 200}];
  direction = {x: 0, y: 0};
  food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
  score = 0;
  document.querySelector('.score').textContent = '得分：0';
  gameOver.style.display = 'none';
  gameRunning = true;
  gameLoop();
}

// 绑定重新开始按钮
restartBtn.addEventListener('click', restartGame);
restartBtn2.addEventListener('click', restartGame);

// 游戏循环
function gameLoop() {
  update();
  draw();
  const speed = parseInt(difficultySelect.value);
  setTimeout(gameLoop, speed);
}

// 更新游戏状态
function update() {
  if (!gameRunning) return;

  // 移动蛇
  const head = {x: snake[0].x + direction.x * snakeSize, y: snake[0].y + direction.y * snakeSize};
  snake.unshift(head);
  snake.pop();

  // 检测碰撞
  if (head.x === food.x && head.y === food.y) {
    // 吃到食物
    snake.push({});
    food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
    score += 10;
    document.querySelector('.score').textContent = '得分：' + score;
  }

  // 检测游戏结束条件
  if (
    head.x < 0 || head.x >= canvas.width || 
    head.y < 0 || head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameRunning = false;
    finalScore.textContent = score;
    gameOver.style.display = 'block';
  }
}

// 绘制游戏画面
function draw() {
  // 清空画布
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制蛇
  ctx.fillStyle = '#000';
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
  });

  // 绘制食物
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// 控制方向
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = {x: 0, y: -1};
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = {x: 0, y: 1};
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = {x: -1, y: 0};
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = {x: 1, y: 0};
      break;
  }
});

// 开始游戏
gameLoop();