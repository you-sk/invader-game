// player.ts
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export const player = {
    x: 350,
    y: 550,
    width: 100,
    height: 20,
    speed: 5,
};

// プレイヤーの描画
export function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// プレイヤーの移動処理
export function handlePlayerInput(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}
