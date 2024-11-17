import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

describe('E-commerce site', () => {
  test('Search with a keyword that matches multiple products', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    const searchKeyword = 'product';

    // Navigate to the website
    console.log('Navigating to the website...');
    await page.goto('https://e-commerce-kib.netlify.app');
    await page.waitForTimeout(5000);

    // Screenshot after navigating to the website
    const accessScreenshotPath = path.join(__dirname, 'screenshots', 'searchMultiProduct_accessWebsite.png');
    await page.screenshot({ path: accessScreenshotPath });
    console.log(`Screenshot taken and saved to ${accessScreenshotPath}`);

    // Search using the keyword
    console.log(`Searching for the keyword "${searchKeyword}"...`);
    await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', searchKeyword);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);

    // Screenshot after searching for the keyword
    const searchScreenshotPath = path.join(__dirname, 'screenshots', 'searchMultiProduct_search.png');
    await page.screenshot({ path: searchScreenshotPath });
    console.log(`Screenshot taken and saved to ${searchScreenshotPath}`);

    // Verify and display the search results
    console.log('Verifying the search results...');
    const searchResults = await page.$$eval('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer', (items, searchKeyword) =>
      items
        .filter(item => item.textContent?.toLowerCase().includes(searchKeyword.toLowerCase()))
        .map(item => item.textContent),
      searchKeyword
    );

    // Screenshot after verifying the search results
    const verifyScreenshotPath = path.join(__dirname, 'screenshots', 'searchMultiProduct_verifyResults.png');
    await page.screenshot({ path: verifyScreenshotPath });
    console.log(`Screenshot taken and saved to ${verifyScreenshotPath}`);

    if (searchResults.length > 0) {
      console.log(`Products found in the search results:`);
      searchResults.forEach(result => console.log(result));
    } else {
      console.log(`No products found for the keyword "${searchKeyword}".`);
    }

    await browser.close();
  }, 30000); // Set a 30-second timeout for this test
});
