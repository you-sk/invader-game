// enemy.ts
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

interface Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    alive: boolean;
}

export const enemies: Enemy[] = [];
const rows = 3;
const cols = 5;
const enemyWidth = 50;
const enemyHeight = 30;
const enemyPadding = 20;
const offsetTop = 50;
const offsetLeft = 50;

// 敵キャラクターを初期化
export function initEnemies() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const enemyX = col * (enemyWidth + enemyPadding) + offsetLeft;
            const enemyY = row * (enemyHeight + enemyPadding) + offsetTop;
            enemies.push({ x: enemyX, y: enemyY, width: enemyWidth, height: enemyHeight, alive: true });
        }
    }
}

// 敵キャラクターの描画
export function drawEnemies() {
    ctx.fillStyle = "red";
    enemies.forEach((enemy) => {
        if (enemy.alive) {
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    });
}
