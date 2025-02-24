// 🎲 1. 設定・変数定義
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const player = {
    x: 350,
    y: 550,
    width: 100,
    height: 20,
    speed: 5,
};

// 🎲 敵キャラクター設定
interface Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    alive: boolean;
}

const enemies: Enemy[] = [];
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
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const enemyX = col * (enemyWidth + enemyPadding) + offsetLeft;
        const enemyY = row * (enemyHeight + enemyPadding) + offsetTop;
        enemies.push({ x: enemyX, y: enemyY, width: enemyWidth, height: enemyHeight, alive: true });
    }
}



// 🔄 敵キャラクターの移動処理
function moveEnemies() {
    let moveDown = false;

    enemies.forEach((enemy) => {
        if (enemy.alive) {
            enemy.x += enemySpeed * enemyDirection;

            // 画面端で反転する
            if (enemy.x + enemy.width > canvas.width || enemy.x < 0) {
                enemyDirection *= -1;
                moveDown = true;
            }
        }
    });

    // すべての敵を下に移動させる
    if (moveDown) {
        enemies.forEach((enemy) => {
            enemy.y += enemyHeight;
        });
    }
}

// 🎨 2. 描画関数
function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 🎨 敵キャラクターを描画
function drawEnemies() {
    ctx.fillStyle = "red";
    enemies.forEach((enemy) => {
        if (enemy.alive) {
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    });
}

// 🔄 3. 更新処理
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    moveEnemies(); // 敵の移動を追加
}

// 🎮 4. キーボード入力の処理
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}
window.addEventListener("keydown", handleKeyDown);

// 🚀 5. ゲームループ
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}
gameLoop();
