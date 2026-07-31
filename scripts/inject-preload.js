const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const basePath = process.env.CLOUDFLARE_BUILD === 'true' ? '' : '/Youguang-Studio';

function injectIntoHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const links = [
    { href: `${basePath}/hero-bg.jpg`, as: 'image', fetchpriority: 'high', check: 'hero-bg.jpg' },
    { href: `${basePath}/content.json`, as: 'fetch', crossorigin: 'anonymous', check: 'content.json' },
  ];

  for (const link of links) {
    if (!html.includes(link.check)) {
      const tag = `<link rel="preload" href="${link.href}" as="${link.as}"${link.fetchpriority ? ' fetchpriority="'+link.fetchpriority+'"' : ''}${link.crossorigin ? ' crossorigin="'+link.crossorigin+'"' : ''}>`;
      html = html.replace('<head>', '<head>\n' + tag);
      changed = true;
    }
  }

  if (changed) {
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
