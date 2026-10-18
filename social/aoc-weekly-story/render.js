// node render.js [out.png]  -> renders template.html to a 1080x1920 PNG
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const out = process.argv[2] || "week-1.png";
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto("file://" + path.resolve(__dirname, "template.html"));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  await p.screenshot({ path: out });
  await b.close();
})();
