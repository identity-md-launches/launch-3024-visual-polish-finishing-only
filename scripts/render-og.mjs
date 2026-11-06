// Optional artwork export; the site itself needs neither Node nor Playwright.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const modulePath = process.env.WHEELINGS_PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(resolve(modulePath)).href : 'playwright');
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(new URL('../artwork/og.html', import.meta.url).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const fontsReady = await page.evaluate(() => ['Fraunces', 'Figtree'].every(name => [...document.fonts].some(font => font.family.replace(/["']/g, '') === name && font.status === 'loaded')));
  if (!fontsReady) throw new Error('Google Fonts did not load. Retry with network access before replacing og.png.');
  await page.screenshot({ path: fileURLToPath(new URL('../og.png', import.meta.url)) });
  console.log('Rendered og.png at 1200 × 630. Run python3 scripts/export.py to update dist.');
} finally {
  await browser.close();
}
