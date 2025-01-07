import type { Context } from "hono";

import { initialize, svg2png } from "svg2png-wasm";
import wasm from "svg2png-wasm/svg2png_wasm_bg.wasm";

import { hexToRgba } from "@/utils/color-utils";
import { fonts, FontsEnum } from "@/utils/fonts";

let svg2pngInitialized = false;

async function ensureSvg2PngInitialized() {
  if (!svg2pngInitialized) {
    await initialize(wasm);
    svg2pngInitialized = true;
  }
}

function generateSvg({
  width,
  height,
  text,
  fontSize,
  bgColor,
  fontColor,
  font,
}: {
  width: number;
  height: number;
  text: string;
  fontSize: number;
  bgColor: string;
  fontColor: string;
  font: FontsEnum;
}) {
  const fontBase64 = fonts[font] || fonts[FontsEnum.Arial];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style type="text/css">
      @font-face {
        font-family: '${font}';
        src: url('${fontBase64}') format('truetype');
      }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="${bgColor}" />
  <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-family="${font}" font-size="${fontSize}" fill="${fontColor}">
    ${text}
  </text>
</svg>`;
}

export async function placeholderHandler(c: Context) {
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
    while (finalFontSize > 10 && (text as string).length * finalFontSize > widthInt - 20) {
      finalFontSize--;
    }
  }

  // Generate the SVG and font buffer in parallel
  const generateSvgPromise = generateSvg({
    width: widthInt,
    height: heightInt,
    text: text as string,
    fontSize: finalFontSize,
    bgColor,
    fontColor,
    font: font as FontsEnum,
  });

  const fontData = fonts[font as FontsEnum];
  const fontBufferPromise = Promise.resolve(
    Uint8Array.from(atob(fontData.split(",")[1]), c => c.charCodeAt(0)),
  );

  if (format === "png") {
    await ensureSvg2PngInitialized();
  }

  const [svg, fontBuffer] = await Promise.all([generateSvgPromise, fontBufferPromise]);

  if (format === "svg") {
    c.header("Content-Type", "image/svg+xml");
    return new Response(svg, { status: 200, headers: { "Content-Type": "image/svg+xml" } });
  }

  const buf = await svg2png(svg, {
    width: widthInt,
    height: heightInt,
    fonts: [fontBuffer],
  });

  c.header("Content-Type", "image/png");
  return new Response(buf, { status: 200, headers: { "Content-Type": "image/png" } });
}
