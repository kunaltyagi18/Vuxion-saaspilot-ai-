// Improved BG removal: pre-blur + flood-fill + despeckle + alpha feather
const sharp = require('sharp');
const path = require('path');

const input  = path.join(__dirname, '../public/hero-boy.png');
const output = path.join(__dirname, '../public/hero-boy-nobg.png');

async function run() {
  // Step 1 — slightly blur first to kill JPEG noise, then work on that
  const blurred = await sharp(input)
    .blur(1.2)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: src, info } = blurred;
  const { width, height, channels } = info;

  // Load original (sharp) for the final output pixels
  const origBuf = await sharp(input).ensureAlpha().raw().toBuffer();

  const isBackground = (r, g, b) => {
    const brightness = (r + g + b) / 3;
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const saturation = maxC > 0 ? (maxC - minC) / maxC : 0;
    return brightness < 50 && saturation < 0.35;
  };

  const idx = (x, y) => (y * width + x) * channels;

  // Step 2 — BFS flood-fill from all 4 edges on the BLURRED image
  const visited = new Uint8Array(width * height);
  const queue = [];

  const seed = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = idx(x, y);
    if (visited[y * width + x]) return;
    if (isBackground(src[i], src[i+1], src[i+2])) {
      visited[y * width + x] = 1;
      queue.push(x, y);
    }
  };

  for (let x = 0; x < width; x++) { seed(x, 0); seed(x, height-1); }
  for (let y = 1; y < height-1; y++) { seed(0, y); seed(width-1, y); }

  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]];
  for (let qi = 0; qi < queue.length; qi += 2) {
    const cx = queue[qi], cy = queue[qi+1];
    for (const [dx, dy] of dirs) {
      const nx = cx+dx, ny = cy+dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (visited[ny * width + nx]) continue;
      const i = idx(nx, ny);
      if (isBackground(src[i], src[i+1], src[i+2])) {
        visited[ny * width + nx] = 1;
        queue.push(nx, ny);
      }
    }
  }

  // Step 3 — despeckle: any isolated transparent pixel surrounded by opaque = make opaque
  const isBg = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return true;
    return visited[y * width + x] === 1;
  };
  for (let y = 1; y < height-1; y++) {
    for (let x = 1; x < width-1; x++) {
      if (visited[y * width + x]) {
        // Check 4 direct neighbours - if fewer than 2 are bg, it's a speck
        const bgNeighbours = [[1,0],[-1,0],[0,1],[0,-1]]
          .filter(([dx,dy]) => isBg(x+dx,y+dy)).length;
        if (bgNeighbours < 2) visited[y * width + x] = 0;
      }
    }
  }

  // Step 4 — write alpha on original (sharp) pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pi = idx(x, y);
      if (visited[y * width + x]) {
        // Background: fade based on distance from bright/opaque zone
        const r = src[pi], g = src[pi+1], b = src[pi+2];
        const brightness = (r + g + b) / 3;
        origBuf[pi + 3] = Math.min(80, Math.round((brightness / 50) * 60));
      } else {
        origBuf[pi + 3] = 255; // Foreground: fully opaque
      }
    }
  }

  await sharp(origBuf, { raw: { width, height, channels } })
    .png()
    .toFile(output);

  console.log('Done →', output);
}

run().catch(console.error);
