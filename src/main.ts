// main.ts
import { drawPlayer, handlePlayerInput } from './player';
import { drawBullets, moveBullets, bullets } from './bullet';
import { drawEnemies, moveEnemies, initEnemies, checkBulletCollisions, enemies } from './enemy';
import { isGameOver, showGameOver, checkEnemyReachBottom, handleGameOverInput, isGameClear, showGameClear, checkAllEnemiesDefeated } from './game';


import { ctx } from './canvas'; // Canvasのコンテキストをインポート


// 初期化処理
function init() {
    initEnemies();
    window.addEventListener("keydown", handlePlayerInput);
    window.addEventListener('keydown', handleGameOverInput);
}

// 更新処理
function update() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (isGameOver()) {
        showGameOver();
        return;
    }
    if (isGameClear()) {
        showGameClear();
        return;
    }
    drawPlayer();
    drawBullets();
    drawEnemies();
    moveBullets();
    moveEnemies();
    checkBulletCollisions(bullets);
    checkEnemyReachBottom(enemies);
    checkAllEnemiesDefeated();
}

// ゲームループ
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// ゲーム開始
init();
gameLoop();
