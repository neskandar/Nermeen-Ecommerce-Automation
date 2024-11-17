import { chromium, ElementHandle } from 'playwright';
import fs from 'fs';
import path from 'path';

describe('E-commerce site', () => {
  test('Delete a product', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    const productName = 'Nermeen Product';

    // Navigate to the website
    console.log('Navigating to the website...');
    await page.goto('https://e-commerce-kib.netlify.app');
    await page.waitForTimeout(5000);

    // Screenshot after navigating to the website
    const accessScreenshotPath = path.join(__dirname, 'screenshots', 'deleteProduct_accessWebsite.png');
    await page.screenshot({ path: accessScreenshotPath });
    console.log(`Screenshot taken and saved to ${accessScreenshotPath}`);

    // Search for the product to check if it exists
    console.log(`Searching for the product "${productName}" to check if it exists...`);
    await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', productName);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);

    // Screenshot after searching for the product
    const searchScreenshotPath = path.join(__dirname, 'screenshots', 'deleteProduct_searchProduct.png');
    await page.screenshot({ path: searchScreenshotPath });
    console.log(`Screenshot taken and saved to ${searchScreenshotPath}`);

    // Find the product item element
    const productItems = await page.$$('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer');
    let productItem: ElementHandle<HTMLElement | SVGElement> | null = null;

    for (const item of productItems) {
      const textContent = await item.textContent();
      if (textContent && textContent.includes(productName)) {
        productItem = item;
        break;
      }
    }

    if (!productItem) {
      console.log(`Product "${productName}" does not exist. Exiting script...`);
    } else {
      // Click the located product
      console.log('Clicking the located product...');
      await productItem.click();
      await page.waitForTimeout(5000);

      // Screenshot after clicking the located product
      const clickProductScreenshotPath = path.join(__dirname, 'screenshots', 'deleteProduct_clickProduct.png');
      await page.screenshot({ path: clickProductScreenshotPath });
      console.log(`Screenshot taken and saved to ${clickProductScreenshotPath}`);

      // Click the "Delete" button
      console.log('Clicking the "Delete" button...');
      const deleteButton = await page.waitForSelector('.card-actions button:nth-child(2)', { timeout: 60000 });
      if (deleteButton) {
        await deleteButton.click();
        await page.waitForTimeout(5000);

        // Screenshot after clicking the "Delete" button
        const deleteButtonScreenshotPath = path.join(__dirname, 'screenshots', 'deleteProduct_clickDeleteButton.png');
        await page.screenshot({ path: deleteButtonScreenshotPath });
        console.log(`Screenshot taken and saved to ${deleteButtonScreenshotPath}`);

        // Verify the product is deleted
        console.log('Verifying the product is deleted...');
        await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', productName);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);

        // Screenshot after verifying the product is deleted
        const verifyScreenshotPath = path.join(__dirname, 'screenshots', 'deleteProduct_verify.png');
        await page.screenshot({ path: verifyScreenshotPath });
        console.log(`Screenshot taken and saved to ${verifyScreenshotPath}`);

        const productExists = await page.$$eval('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer', (items, productName) =>
          items.some(item => item.textContent?.includes(productName)), productName
        );

        if (!productExists) {
          console.log('Product deleted successfully!');
        } else {
          console.log('Failed to delete the product.');
        }
      } else {
        console.log('Delete button not found.');
      }
    }

    await browser.close();
  }, 60000); // Set a 30-second timeout for this test
});
