import sharp from "sharp";
import path from "node:path";

const input = path.resolve("Public", "logo  HQ.webp");
const output = path.resolve("Public", "logo-transparent.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const isNearWhite = r > 225 && g > 225 && b > 225;
  const isLowSaturation = max - min < 24;

  if (isNearWhite && isLowSaturation) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .png()
  .toFile(output);

console.log(output);
