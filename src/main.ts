// main.ts
import { drawPlayer, handlePlayerInput } from './player';
import { drawBullets, moveBullets, bullets } from './bullet';
import { drawEnemies, moveEnemies, initEnemies, checkBulletCollisions } from './enemy';

import { ctx } from './canvas'; // Canvasのコンテキストをインポート


// 初期化処理
function init() {
    initEnemies();
    window.addEventListener("keydown", handlePlayerInput);
}

// 更新処理
function update() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    moveBullets();
    moveEnemies();
    checkBulletCollisions(bullets);
}

// ゲームループ
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// ゲーム開始
init();
gameLoop();
