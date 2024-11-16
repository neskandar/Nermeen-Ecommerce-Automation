import { chromium } from 'playwright'; 

describe('E-commerce site', () => { test('Search for a product', async () => { 
const browser = await chromium.launch({ headless: false }); 
const page = await browser.newPage ();

  const productName = 'Nermeen Product';

  // Navigate to the website
  console.log('Navigating to the website...');
  await page.goto('https://e-commerce-kib.netlify.app');
  await page.waitForTimeout(5000);

  // Search for the product
  console.log(`Searching for the product "${productName}"...`);
  await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', productName);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);

  // Verify the search results
  console.log('Verifying the search results...');
  const searchResults = await page.$$eval('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer', (items, productName) =>
    items.filter(item => item.textContent?.includes(productName)).length, productName
  );

  if (searchResults > 0) {
    console.log(`Product "${productName}" found in the search results!`);
  } else {
    console.log(`Product "${productName}" not found in the search results.`);
  }

  await browser.close();
}, 30000); // Set a 30-second timeout for this test
});
