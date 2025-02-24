// game.ts
import { ctx } from './canvas';
import { initEnemies, enemies } from './enemy';
import { resetPlayer } from './player';
import { bullets } from './bullet';

let gameOver = false;
let gameClear = false;

export function isGameClear(): boolean {
    return gameClear;
}

export function isGameOver(): boolean {
    return gameOver;
}

// 🎯 ゲームクリアの表示
export function showGameClear() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // 背景を半透明に
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Clear!', ctx.canvas.width / 2, ctx.canvas.height / 2);

    ctx.font = '24px Arial';
    ctx.fillText('Press R to Restart', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
}

// ゲームオーバーの表示
export function showGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // 背景を半透明に
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', ctx.canvas.width / 2, ctx.canvas.height / 2);

    ctx.font = '24px Arial';
    ctx.fillText('Press R to Restart', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
}

// 敵が画面下に到達したかをチェック
export function checkEnemyReachBottom(enemies: { y: number; height: number; alive: boolean; }[]) {
    enemies.forEach((enemy) => {
        if (enemy.alive && enemy.y + enemy.height >= ctx.canvas.height) {
            gameOver = true;
        }
    });
}

// 🎯 すべての敵が倒されたかをチェック（ゲームクリア）
export function checkAllEnemiesDefeated() {
    const allDefeated = enemies.every((enemy) => !enemy.alive);
    if (allDefeated) {
        gameClear = true;
    }
}

// ゲームをリセットする
export function resetGame() {
    gameClear = false;
    gameOver = false;
    initEnemies();
    resetPlayer();
    bullets.length = 0; // 弾をリセット
}

// ゲームオーバー/クリア時のキー入力を処理
export function handleGameOverInput(event: KeyboardEvent) {
    if ((event.key === 'r' || event.key === 'R') && (gameOver || gameClear)) {
        resetGame();
    }
}
