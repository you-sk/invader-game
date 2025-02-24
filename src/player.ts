// player.ts
import { ctx } from './canvas';
import { shootBullet } from './bullet';

export const player = {
    x: 350,
    y: 550,
    width: 100,
    height: 20,
    speed: 5,
    initialX: 350, // 初期位置を設定
    initialY: 550,
};

// プレイヤーの描画
export function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// プレイヤーの移動処理
export function handlePlayerInput(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x + player.width < ctx.canvas.width) {
        player.x += player.speed;
    } else if (event.key === ' ') {
        shootBullet(player.x + player.width / 2, player.y);
    }
}

// 🎮 プレイヤーを初期位置にリセット
export function resetPlayer() {
    player.x = player.initialX;
    player.y = player.initialY;
}