import { chromium } from 'playwright';
import fs from 'fs'; 
import path from 'path';

 describe('E-commerce site', () => { 
  test('Access the website', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navigating to the website...');
  await page.goto('https://e-commerce-kib.netlify.app');
  console.log('Website accessed successfully.');

  // Wait for 10 seconds before closing
  await page.waitForTimeout(10000);

  // Take a screenshot 
  const screenshotPath = path.join(__dirname, 'screenshots', 'accessWebsite.png'); 
  await page.screenshot({ path: screenshotPath }); 
  console.log(`Screenshot taken and saved to ${screenshotPath}`);
  

  await browser.close();
}, 60000); // Set a 30-second timeout for this test
});
