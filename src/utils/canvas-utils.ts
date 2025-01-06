// utils/canvas-utils.ts
import type { CanvasRenderingContext2D } from "canvas";

import { createCanvas } from "canvas";

export function setupCanvas(width: number, height: number, bgColor: string) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  return { canvas, ctx };
}

export function calculateFontSize(ctx: CanvasRenderingContext2D, text: string, width: number, initialFontSize: number) {
  let fontSize = initialFontSize === 0 ? Math.round(width / (text.length / 2.5)) : initialFontSize;

  ctx.font = `${fontSize}px 'NewAmsterdam'`;

  while (ctx.measureText(text).width > width - 20) {
    fontSize--;
    ctx.font = `${fontSize}px 'NewAmsterdam'`;
  }

  return fontSize;
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, fontSize: number, fontColor: string, width: number, height: number) {
  ctx.fillStyle = fontColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);
}
