// main.ts
import { player, drawPlayer, handlePlayerInput } from './player';
import { enemies, initEnemies, drawEnemies } from './enemy';

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// 初期化処理
function init() {
    initEnemies();
    window.addEventListener("keydown", handlePlayerInput);
}

// 更新処理
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
}

// ゲームループ
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// ゲーム開始
init();
gameLoop();
