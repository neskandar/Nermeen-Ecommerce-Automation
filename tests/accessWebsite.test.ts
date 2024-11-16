import { chromium } from 'playwright';

 describe('E-commerce site', () => { 
  test('Access the website', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navigating to the website...');
  await page.goto('https://e-commerce-kib.netlify.app');
  console.log('Website accessed successfully.');

  // Wait for 10 seconds before closing
  await page.waitForTimeout(10000);

  await browser.close();
}, 30000); // Set a 30-second timeout for this test
});
