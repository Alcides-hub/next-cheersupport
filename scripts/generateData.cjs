const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { encode } = require('blurhash');

const imagesDir = path.join(__dirname, '../public/images');
const outputJsonPath = path.join(__dirname, '../imageData.json');

// Function to process images and generate BlurHash
async function processImages() {
  const imageData = [];
  const supportedFormats = ['.jpg', '.jpeg', '.png']; // Supported formats

  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const fileExt = path.extname(file).toLowerCase();

    // Check if file is a supported format
    if (!supportedFormats.includes(fileExt)) {
      console.error(`Unsupported image format for file: ${file}`);
      continue; // Skip unsupported formats
    }

    try {
      // Resize image to 32x32 for BlurHash
      const { data, info } = await sharp(filePath)
        .resize(32, 32)
        .raw()
        .toBuffer({ resolveWithObject: true });

      const blurHash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
      imageData.push({ file, blurHash });
      console.log(`Processed image: ${file}, BlurHash: ${blurHash}`);

    } catch (error) {
      console.error(`Error processing image ${file}:`, error.message);
    }
  }

  fs.writeFileSync(outputJsonPath, JSON.stringify(imageData, null, 2));
  console.log('Image data written to', outputJsonPath);
}

// Run the function
processImages().catch(error => {
  console.error('Error processing images:', error.message);
});
