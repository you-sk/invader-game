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

// 弾のインターフェース
interface Bullet {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    active: boolean;
}

// 弾の配列
const bullets: Bullet[] = [];

// 弾を作成して配列に追加
function shootBullet() {
    const bulletWidth = 5;
    const bulletHeight = 10;
    const bulletX = player.x + player.width / 2 - bulletWidth / 2;
    const bulletY = player.y - bulletHeight;
    const newBullet: Bullet = {
        x: bulletX,
        y: bulletY,
        width: bulletWidth,
        height: bulletHeight,
        speed: 7,
        active: true,
    };
    bullets.push(newBullet);
}
// 弾を描画
function drawBullets() {
    ctx.fillStyle = "yellow";
    bullets.forEach((bullet) => {
        if (bullet.active) {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
    });
}

// 弾を移動
function moveBullets() {
    bullets.forEach((bullet) => {
        if (bullet.active) {
            bullet.y -= bullet.speed;
            // 画面外に出たら非アクティブにする
            if (bullet.y + bullet.height < 0) {
                bullet.active = false;
            }
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

// 弾と敵の衝突をチェック
function checkCollisions() {
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

// 更新処理
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    drawBullets();
    moveBullets();
    moveEnemies();
    checkCollisions();
}


// キーボード入力の処理
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    } else if (event.key === " ") {
        shootBullet();
    }
}

window.addEventListener("keydown", handleKeyDown);

// 🚀 5. ゲームループ
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}
gameLoop();
