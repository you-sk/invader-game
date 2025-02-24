const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("Canvasがサポートされていません");
}

// ctx が null でないことを明示する
const context = ctx as CanvasRenderingContext2D;

// プレイヤー設定
const player = {
    x: 350,
    y: 550,
    width: 100,
    height: 20,
    speed: 5,
};

// プレイヤーを描画する関数
function drawPlayer() {
    context.fillStyle = "white";
    context.fillRect(player.x, player.y, player.width, player.height);
}

// 画面を更新する関数
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
}

// キーボード入力を処理する関数
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}

// イベントリスナーを設定
window.addEventListener("keydown", handleKeyDown);

// ゲームループを開始
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
