import type { FontsEnum } from "@/utils/fonts";

import { fonts } from "@/utils/fonts";

// Cache font buffers to avoid repeated conversion from base64
const fontBuffers: Record<FontsEnum, Uint8Array> = {} as Record<FontsEnum, Uint8Array>;

/**
 * Gets the cached font buffer or converts the base64 font to a Uint8Array if not cached.
 * @param {FontsEnum} font - The font to get the buffer for. This should be a valid FontsEnum value.
 * @returns {Uint8Array} The font buffer as a Uint8Array.
 */
export function getFontBuffer(font: FontsEnum): Uint8Array {
  if (!(font in fonts)) {
    throw new Error(`Font ${font} not found in the fonts object.`);
  }

  if (!fontBuffers[font]) {
    const fontData = fonts[font];
    fontBuffers[font] = Uint8Array.from(
      atob(fontData.split(",")[1]),
      c => c.charCodeAt(0),
    );
  }

  return fontBuffers[font];
}
