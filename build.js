/**
 * Cross-platform build script for Netlify, Vercel, and GitHub Pages
 * Populates root, dist/, and public/ so any publish setting works seamlessly
 */

const fs = require('fs');
const path = require('path');

const ROOT_FILES = [
  'index.html',
  'img1.webp',
  'img2.jpeg',
  'img3.jpeg',
  'img4.jpeg',
  'vid1.jpeg',
  'vid2.jpeg',
  '_redirects',
  'vercel.json',
  'netlify.toml'
];

const DIRS = ['css', 'js'];

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.existsSync(source)) {
    const files = fs.readdirSync(source);
    for (const file of files) {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursive(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    }
  }
}

// Build output directories
['dist', 'public'].forEach(outDir => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Copy root files
  for (const f of ROOT_FILES) {
    if (fs.existsSync(f)) {
      fs.copyFileSync(f, path.join(outDir, f));
    }
  }

  // Copy css and js directories
  for (const dir of DIRS) {
    copyFolderRecursive(dir, path.join(outDir, dir));
  }
});

console.log('✓ Build successful: Generated dist/ and public/ static bundles.');
