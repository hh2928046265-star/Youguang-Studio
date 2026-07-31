const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// Dynamic basePath: empty for Cloudflare, /Youguang-Studio for GitHub Pages
const basePath = process.env.CLOUDFLARE_BUILD === 'true' ? '' : '/Youguang-Studio';

function injectIntoHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  
  const preloadLinks = [
    `<link rel="preload" href="${basePath}/hero-bg.jpg" as="image" fetchpriority="high">`,
    `<link rel="preload" href="${basePath}/content.json" as="fetch" crossorigin="anonymous">`,
  ];
  
  if (!html.includes('hero-bg.jpg')) {
    html = html.replace('<head>', '<head>\n' + preloadLinks.join('\n'));
    fs.writeFileSync(filePath, html);
    console.log('Injected preload into:', path.basename(filePath));
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.html')) {
      injectIntoHtml(fullPath);
    }
  }
}

walk(outDir);
console.log('Preload injection complete (basePath:', basePath || '(none)', ')');
