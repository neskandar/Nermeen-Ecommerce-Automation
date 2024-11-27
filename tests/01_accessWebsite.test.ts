import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

describe('E-commerce site', () => {
  test('Access the website', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('Navigating to the website...');
    
    try {
      await page.goto('https://e-commerce-kib.netlify.app', { timeout: 60000, waitUntil: 'load' });
      console.log('Website accessed successfully.');
    } catch (error) {
      console.error('Error navigating to the website:', error);
      await browser.close();
      throw error;
    }

    // Wait for 10 seconds before closing
    await page.waitForTimeout(10000);

    // Take a screenshot
    const screenshotPath = path.join(__dirname, 'screenshots', 'accessWebsite.png');
    console.log(`Screenshot will be saved to: ${screenshotPath}`);

    // Delete the existing screenshot if it exists
    if (fs.existsSync(screenshotPath)) {
      fs.unlinkSync(screenshotPath);
      console.log(`Existing screenshot deleted: ${screenshotPath}`);
    }

    try {
      console.log('Taking screenshot...');
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot taken and saved to ${screenshotPath}`);
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }

    await browser.close();
  }, 120000); // Set a 120-second timeout for this test
});
