import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

describe('E-commerce site', () => {
  test('Search for a product', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    const productName = 'Nermeen Product';

    // Navigate to the website
    console.log('Navigating to the website...');
    await page.goto('https://e-commerce-kib.netlify.app');
    await page.waitForTimeout(5000);

    // Screenshot after navigating to the website
    const accessScreenshotPath = path.join(__dirname, 'screenshots', 'searchProduct_accessWebsite.png');
    await page.screenshot({ path: accessScreenshotPath });
    console.log(`Screenshot taken and saved to ${accessScreenshotPath}`);

    // Search for the product
    console.log(`Searching for the product "${productName}"...`);
    await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', productName);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);

    // Screenshot after searching for the product
    const searchScreenshotPath = path.join(__dirname, 'screenshots', 'searchProduct_search.png');
    await page.screenshot({ path: searchScreenshotPath });
    console.log(`Screenshot taken and saved to ${searchScreenshotPath}`);

    // Verify the search results
    console.log('Verifying the search results...');
    const searchResults = await page.$$eval('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer', (items, productName) =>
      items.filter(item => item.textContent?.includes(productName)).length, productName
    );

    // Screenshot after verifying the search results
    const verifyScreenshotPath = path.join(__dirname, 'screenshots', 'searchProduct_verifyResults.png');
    await page.screenshot({ path: verifyScreenshotPath });
    console.log(`Screenshot taken and saved to ${verifyScreenshotPath}`);

    if (searchResults > 0) {
      console.log(`Product "${productName}" found in the search results!`);
    } else {
      console.log(`Product "${productName}" not found in the search results.`);
    }

    await browser.close();
  }, 30000); // Set a 30-second timeout for this test
});
