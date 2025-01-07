import type { FontsEnum } from "@/utils/fonts";

import { fonts } from "@/utils/fonts";

// Cache font buffers to avoid repeated conversion from base64
const fontBuffers: Record<string, Uint8Array> = {};

/**
 * Gets the cached font buffer or converts the base64 font to a Uint8Array if not cached.
 * @param {string} font - The font to get the buffer for. This should be a valid font name or identifier.
 * @returns {Uint8Array} The font buffer as a Uint8Array.
 */
export function getFontBuffer(font: FontsEnum): Uint8Array {
  if (!fontBuffers[font]) {
    const fontData = fonts[font];
    fontBuffers[font] = Uint8Array.from(atob(fontData.split(",")[1]), c => c.charCodeAt(0));
  }
  return fontBuffers[font];
}
