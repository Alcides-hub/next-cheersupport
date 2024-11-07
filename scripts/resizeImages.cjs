// resizeImages.cjs

// resizeImages.cjs

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../public/images');
const outputDir = path.join(imagesDir, 'resized');
const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif'];

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Read the images directory
fs.readdir(imagesDir, (err, files) => {
    if (err) {
        console.error('Error reading the images directory:', err);
        return;
    }

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (!supportedFormats.includes(ext)) {
            console.warn(`Skipping unsupported file format: ${file}`);
            return; // Skip unsupported files
        }

        const inputPath = path.join(imagesDir, file);
        const outputPath = path.join(outputDir, file);

        // Resize each image to 600x600 pixels
        sharp(inputPath)
            .resize(600, 600)
            .toFile(outputPath, (err) => {
                if (err) {
                    console.error(`Error processing ${file}:`, err.message); // Log the specific error
                    // Optionally log the input path for better debugging
                    console.error(`Input path: ${inputPath}`);
                } else {
                    console.log(`Resized ${file} and saved to ${outputPath}`);
                }
            });
    });
});
