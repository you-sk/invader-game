// enemy.ts
import { ctx } from './canvas';
import { Bullet } from './bullet';

interface Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    alive: boolean;
}

export const enemies: Enemy[] = [];
const rows = 3; // 敵の行数
const cols = 5; // 敵の列数
const enemyWidth = 50;
const enemyHeight = 30;
const enemyPadding = 20;
const offsetTop = 50;
const offsetLeft = 50;

// 敵の移動設定
let enemyDirection = 1; // 1 = 右, -1 = 左
const enemySpeed = 2;

// 敵キャラクターを初期化
export function initEnemies() {
    enemies.length = 0; // 既存の敵をクリア
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

// 敵キャラクターの移動処理
export function moveEnemies() {
    let moveDown = false;

    enemies.forEach((enemy) => {
        if (enemy.alive) {
            enemy.x += enemySpeed * enemyDirection;

            // 画面端で反転する
            if (enemy.x + enemy.width > ctx.canvas.width || enemy.x < 0) {
                enemyDirection *= -1;
                moveDown = true;
            }
        }
    });

    // 敵が画面端に達したら下に移動
    if (moveDown) {
        enemies.forEach((enemy) => {
            enemy.y += enemyHeight;
        });
    }
}

// 当たり判定の実装
export function checkBulletCollisions(bullets: Bullet[]) {
    bullets.forEach((bullet) => {
        if (bullet.active) {
            enemies.forEach((enemy) => {
                if (enemy.alive && isColliding(bullet, enemy)) {
                    bullet.active = false;
                    enemy.alive = false;
                }
            });
        }
    });
}

// 矩形の衝突判定
function isColliding(rect1: { x: number; y: number; width: number; height: number; }, rect2: { x: number; y: number; width: number; height: number; }): boolean {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}
