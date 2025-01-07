import { fonts, FontsEnum } from "@/utils/fonts";

/**
 * Generates an SVG string with the given parameters.
 * @param {object} params - The parameters for the SVG.
 * @param {number} params.width - The width of the SVG.
 * @param {number} params.height - The height of the SVG.
 * @param {string} params.text - The text to render in the SVG.
 * @param {number} params.fontSize - The font size to use for the text.
 * @param {string} params.bgColor - The background color of the SVG.
 * @param {string} params.fontColor - The font color of the text.
 * @param {FontsEnum} params.font - The font to use for the text.
 * @returns {string} The generated SVG string.
 */
export function generateSvg({
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
