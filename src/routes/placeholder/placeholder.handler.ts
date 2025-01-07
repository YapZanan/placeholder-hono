import type { Context } from "hono";

import { initialize, svg2png } from "svg2png-wasm";
import wasm from "svg2png-wasm/svg2png_wasm_bg.wasm";

import { hexToRgba } from "@/utils/color-utils";
import { getFontBuffer } from "@/utils/font-utils";
import { FontsEnum } from "@/utils/fonts";
import { generateSvg } from "@/utils/svg-utils";

// Initialize svg2png-wasm once when the worker starts
let isWasmInitialized = false;
async function initializeWasm() {
  if (!isWasmInitialized) {
    await initialize(wasm);
    isWasmInitialized = true;
  }
}

const svgCache: Record<string, string> = {};

export async function placeholderHandler(c: Context) {
  await initializeWasm();

  const {
    width = 600,
    height = 400,
    text = `${width} x ${height}`,
    font_size = "0",
    bg_color = "EEEEEEFF",
    font_color = "31343DFF",
    font = FontsEnum.Arial,
    format = "png",
  } = c.req.query();

  const widthInt = Number.parseInt(width as string);
  const heightInt = Number.parseInt(height as string);
  const fontSize = font_size === "0" ? widthInt / Math.round((text as string).length / 1.75) : Number.parseInt(font_size as string);
  const bgColor = hexToRgba(bg_color as string);
  const fontColor = hexToRgba(font_color as string);

  let finalFontSize = fontSize;
  if (fontSize === 0) {
    finalFontSize = Math.max(10, Math.floor(widthInt / (text.length * 0.5)));
  }

  const cacheKey = `${widthInt}-${heightInt}-${text}-${font}-${finalFontSize}-${bgColor}-${fontColor}`;

  if (svgCache[cacheKey]) {
    const cachedSvg = svgCache[cacheKey];
    if (format === "svg") {
      c.header("Content-Type", "image/svg+xml");
      return new Response(cachedSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } });
    }

    const fontBuffer = getFontBuffer(font as FontsEnum);
    const buf = await svg2png(cachedSvg, {
      width: widthInt,
      height: heightInt,
      fonts: [fontBuffer],
    });

    c.header("Content-Type", "image/png");
    return new Response(buf, { status: 200, headers: { "Content-Type": "image/png" } });
  }

  // Generate SVG if not cached
  const svg = generateSvg({
    width: widthInt,
    height: heightInt,
    text: text as string,
    fontSize: finalFontSize,
    bgColor,
    fontColor,
    font: font as FontsEnum,
  });

  // Store the generated SVG in the cache
  svgCache[cacheKey] = svg;

  if (format === "svg") {
    c.header("Content-Type", "image/svg+xml");
    return new Response(svg, { status: 200, headers: { "Content-Type": "image/svg+xml" } });
  }

  // Get cached font buffer
  const fontBuffer = getFontBuffer(font as FontsEnum);

  // Convert the SVG to PNG using svg2png-wasm
  const buf = await svg2png(svg, {
    width: widthInt,
    height: heightInt,
    fonts: [fontBuffer],
  });

  // Return the PNG as the response
  c.header("Content-Type", "image/png");
  return new Response(buf, { status: 200, headers: { "Content-Type": "image/png" } });
}
