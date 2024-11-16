import { chromium } from 'playwright';

describe('E-commerce site', () => { 
  test('Add a new product', async () => { 
  const browser = await chromium.launch({ headless: false }); 
  const page = await browser.newPage();

  const productName = 'Nermeen Product';

  // Navigate to the website
  console.log('Navigating to the website...');
  await page.goto('https://e-commerce-kib.netlify.app');
  await page.waitForTimeout(5000);

  // Search for the product to check if it already exists
  console.log(`Searching for the product "${productName}" to check if it already exists...`);
  await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', productName);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);

  const productExists = await page.$$eval('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer', (items, productName) =>
    items.some(item => item.textContent?.includes(productName)), productName
  );

  if (productExists) {
    console.log(`Product "${productName}" already exists. Exiting script...`);
  } else {
    // Add the new product
    console.log('Product not found. Proceeding to add a new product...');

    // Click the "+" button to add a new product
    console.log('Clicking the "+" button to add a new product...');
    await page.click('svg.cursor-pointer:nth-child(1)');
    await page.waitForTimeout(5000);

    // Fill in the product details
    console.log('Filling in the product details...');
    await page.setInputFiles('input[type="file"][name="file"]', 'C:\\Projects\\Ecommerce\\KIBphoto.jpg');
    await page.waitForTimeout(5000);

    await page.fill('#root > div > main > div > form > div:nth-child(2) > div:nth-child(1) > input', productName);
    await page.waitForTimeout(5000);

    await page.fill('#root > div > main > div > form > div:nth-child(3) > div > input', '73');
    await page.waitForTimeout(5000);

    await page.fill('#root > div > main > div > form > div:nth-child(2) > div:nth-child(2) > input', 'Nermeen Product Description Details :)');
    await page.waitForTimeout(5000);

    // Click the "Create Product" button
    console.log('Clicking the "Create Product" button...');
    await page.click('#root > div > main > div > form > button');
    await page.waitForTimeout(5000);

    // Verify the new product
    console.log('Verifying the new product...');
    await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', productName);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);

    const newProductExists = await page.$$eval('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer', (items, productName) =>
      items.some(item => item.textContent?.includes(productName)), productName
    );

    if (newProductExists) {
      console.log('New product added successfully!');
    } else {
      console.log('Failed to add the new product.');
    }
  }

  await browser.close();
}, 60000); // Set a 30-second timeout for this test
});
