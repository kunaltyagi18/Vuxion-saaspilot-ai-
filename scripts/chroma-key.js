// Chroma-key: Hue-based green removal (preserves teal/cyan rim lighting)
const sharp = require('sharp');
const path  = require('path');

const input  = path.join(__dirname, '../public/hero-boy-green.png');
const output = path.join(__dirname, '../public/hero-boy-nobg.png');

// Convert RGB (0-255) to HSL (h: 0-360, s: 0-1, l: 0-1)
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s, l };
}

async function run() {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image: ${width}x${height}, channels: ${channels}`);

  // Green hue range: 85° – 155° (pure green zone, avoids teal at ~175°+)
  const GREEN_HUE_MIN = 85;
  const GREEN_HUE_MAX = 155;
  const GREEN_SAT_MIN = 0.25;  // must be at least somewhat saturated
  const GREEN_LUM_MIN = 0.15;  // not too dark
  const GREEN_LUM_MAX = 0.90;  // not too bright (white is not green)

  // Soft zone: slightly outside the core range (for edge anti-aliasing)
  const SOFT_HUE_MIN = 75;
  const SOFT_HUE_MAX = 165;

  for (let pi = 0; pi < width * height * channels; pi += channels) {
    const r = data[pi], g = data[pi+1], b = data[pi+2];
    const { h, s, l } = rgbToHsl(r, g, b);

    const isGreenSat = s >= GREEN_SAT_MIN && l >= GREEN_LUM_MIN && l <= GREEN_LUM_MAX;
    const inCoreGreen = isGreenSat && h >= GREEN_HUE_MIN && h <= GREEN_HUE_MAX;
    const inSoftGreen = isGreenSat && h >= SOFT_HUE_MIN && h <= SOFT_HUE_MAX;

    if (inCoreGreen) {
      // Fully transparent background pixel
      data[pi+3] = 0;
    } else if (inSoftGreen && !inCoreGreen) {
      // Edge / soft zone — partial transparency based on how far from core
      const distFromCore = Math.min(
        Math.abs(h - GREEN_HUE_MIN),
        Math.abs(h - GREEN_HUE_MAX)
      );
      const edgeWidth = Math.min(
        GREEN_HUE_MIN - SOFT_HUE_MIN,
        SOFT_HUE_MAX - GREEN_HUE_MAX
      );
      const t = distFromCore / edgeWidth; // 0 at core boundary, 1 at soft boundary
      data[pi+3] = Math.round(t * 255);

      // Spill suppression: reduce excess green on edge pixels
      if (g > r && g > b) {
        const excess = g - Math.max(r, b);
        data[pi+1] = Math.max(0, g - Math.round(excess * 0.6 * (1 - t)));
      }
    } else {
      // Foreground pixel — keep fully opaque
      data[pi+3] = 255;
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(output);
  console.log('Done →', output);
}

run().catch(console.error);
