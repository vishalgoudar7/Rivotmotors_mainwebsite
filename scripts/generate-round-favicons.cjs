const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "asset", "RIVOT_Motors_Favicons", "icon.png");
const sizes = [16, 32, 48];

function circleMask(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>` +
    `</svg>`,
  );
}

async function roundPng(size) {
  return sharp(source)
    .resize(size, size, { fit: "fill" })
    .composite([{ input: circleMask(size), blend: "dest-in" }])
    .png()
    .toBuffer();
}

function createIco(images) {
  const headerSize = 6;
  const directorySize = images.length * 16;
  let offset = headerSize + directorySize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}

async function main() {
  const appIcon = await roundPng(512);
  await fs.writeFile(path.join(root, "app", "icon.png"), appIcon);

  const icoImages = await Promise.all(
    sizes.map(async (size) => ({ size, data: await roundPng(size) })),
  );
  await fs.writeFile(path.join(root, "app", "favicon.ico"), createIco(icoImages));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
