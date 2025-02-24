// canvas.ts
export const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

if (!ctx) {
    throw new Error("Canvasがサポートされていません");
}
