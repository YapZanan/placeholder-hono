/**
 * Converts a hex color code (with optional alpha) to RGBA.
 * @param {string} hex - The hex color string (e.g., "FFFFFF", "RRGGBBAA").
 * @returns {string} The RGBA string (e.g., "rgba(255, 255, 255, 1)").
 */
export function hexToRgba(hex: string): string {
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const a = hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
