const https = require('https');

function fetchPage(url, label) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0' }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ html: d, label }));
    });
    req.on('error', () => resolve({ html: '', label }));
    req.end();
  });
}

function parse({ html, label }) {
  // og:image is the app icon
  const iconMatch = html.match(/content="(https:\/\/play-lh\.googleusercontent\.com\/[^"]+)"[^>]*property="og:image"/)
    || html.match(/property="og:image"[^>]*content="(https:\/\/play-lh\.googleusercontent\.com\/[^"]+)"/);
  const icon = iconMatch ? iconMatch[1] : null;

  // Count URL frequency — screenshots appear once, icon appears many times
  const all = [...html.matchAll(/https:\/\/play-lh\.googleusercontent\.com\/[A-Za-z0-9_\-]{50,}/g)].map(x => x[0]);
  const freq = {};
  all.forEach(u => freq[u] = (freq[u] || 0) + 1);

  const unique = [...new Set(all)];
  const screenshots = unique.filter(u => freq[u] === 1);
  const iconByFreq = unique.filter(u => freq[u] >= 3).sort((a, b) => freq[b] - freq[a]);

  console.log(`\n=== ${label} ===`);
  console.log(`ICON_OG: ${icon || 'not found'}`);
  console.log(`ICON_FREQ: ${iconByFreq[0] || 'not found'}`);
  console.log(`SCREENSHOTS (${screenshots.length} unique):`);
  screenshots.slice(0, 12).forEach((u, i) => console.log(`  [${i + 1}] ${u}`));
}

async function main() {
  const apps = [
    { url: 'https://play.google.com/store/apps/details?id=com.pdfwithriverpod.app&hl=en', label: 'PDF ToolKits' },
    { url: 'https://play.google.com/store/apps/details?id=com.jb_qr.app&hl=en', label: 'QR Scanner' },
    { url: 'https://play.google.com/store/apps/details?id=com.healthfulai', label: 'HealthfulAI' },
  ];

  for (const app of apps) {
    const result = await fetchPage(app.url, app.label);
    parse(result);
    await new Promise(r => setTimeout(r, 500));
  }
}

main();
