const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("Canvasがサポートされていません");
}

// 四角形を描画
ctx.fillStyle = "white";
ctx.fillRect(350, 550, 100, 20); // (x, y, width, height)
