// src/lib/png-generator.ts
import { ImageData } from "canvas"; // For working with image data in Cloudflare Workers

// Helper function to generate PNG image
export async function createPngImage({
  width,
  height,
  text,
  fontSize,
  bgColor,
  fontColor,
  fontBase64,
}: {
  width: number;
  height: number;
  text: string;
  fontSize: number;
  bgColor: string;
  fontColor: string;
  fontBase64: string;
}) {
  // Step 1: Create a new image with the specified width and height
  const image = new ImageData(width, height);
  const ctx = image.getContext("2d");

  // Step 2: Convert background color from hex to RGBA
  const bgColorArray = hexToRgbaArray(bgColor);
  const fontColorArray = hexToRgbaArray(fontColor);

  // Step 3: Draw background
  ctx.fillStyle = bgColorArray;
  ctx.fillRect(0, 0, width, height);

  // Step 4: Draw text in the center using the custom font
  const font = new FontFace("CustomFont", fontBase64);
  await font.load();
  document.fonts.add(font);

  ctx.font = `${fontSize}px 'CustomFont'`;
  ctx.fillStyle = fontColorArray;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw the text
  ctx.fillText(text, width / 2, height / 2);

  // Step 5: Convert the image data to PNG format and return it as a buffer
  const pngBuffer = await encodePng(image); // Use your PNG encoder function

  return pngBuffer;
}

// Utility function to convert hex to RGBA array
function hexToRgbaArray(hex: string) {
  const bigint = Number.parseInt(hex, 16);
  const r = (bigint >> 24) & 255;
  const g = (bigint >> 16) & 255;
  const b = (bigint >> 8) & 255;
  const a = (bigint & 255) / 255;
  return [r, g, b, a];
}

// Utility function to encode image as PNG (not implemented in this snippet, could use a library or custom method)
function encodePng(image: ImageData) {
  // Implement PNG encoding logic or use available packages for this purpose
}
