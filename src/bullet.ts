// bullet.ts
import { ctx } from './canvas'; // Canvasのコンテキストをインポート

export interface Bullet {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    active: boolean;
}

export const bullets: Bullet[] = [];

export function shootBullet(x: number, y: number) {
    const bulletWidth = 5;
    const bulletHeight = 10;
    const newBullet: Bullet = {
        x: x,
        y: y,
        width: bulletWidth,
        height: bulletHeight,
        speed: 7,
        active: true,
    };
    bullets.push(newBullet);
}

export function drawBullets() {
    ctx.fillStyle = 'yellow';
    bullets.forEach((bullet) => {
        if (bullet.active) {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
    });
}

export function moveBullets() {
    bullets.forEach((bullet) => {
        if (bullet.active) {
            bullet.y -= bullet.speed;
            if (bullet.y + bullet.height < 0) {
                bullet.active = false;
            }
        }
    });
}
