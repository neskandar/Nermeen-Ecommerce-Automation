import { chromium } from 'playwright'; 

describe('E-commerce site', () => { test('Search with a keyword that matches multiple products', async () => { 
const browser = await chromium.launch({ headless: false }); 
const page = await browser.newPage();

  const searchKeyword = 'product';

  // Navigate to the website
  console.log('Navigating to the website...');
  await page.goto('https://e-commerce-kib.netlify.app');
  await page.waitForTimeout(5000);

  // Search using the keyword
  console.log(`Searching for the keyword "${searchKeyword}"...`);
  await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', searchKeyword);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);

  // Verify and display the search results
  console.log('Verifying the search results...');
  const searchResults = await page.$$eval('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer', (items, searchKeyword) =>
    items
      .filter(item => item.textContent?.toLowerCase().includes(searchKeyword.toLowerCase()))
      .map(item => item.textContent),
    searchKeyword
  );

  if (searchResults.length > 0) {
    console.log(`Products found in the search results:`);
    searchResults.forEach(result => console.log(result));
  } else {
    console.log(`No products found for the keyword "${searchKeyword}".`);
  }

  await browser.close();
}, 30000); // Set a 30-second timeout for this test
});
