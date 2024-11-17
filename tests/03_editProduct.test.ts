import { chromium, ElementHandle } from 'playwright';
import fs from 'fs';
import path from 'path';

describe('E-commerce site', () => {
  test('Edit a product', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    const originalProductName = 'Nermeen Product';
    const updatedProductDetails = {
      title: 'Updated Nermeen Product Title',
      price: '173',
      description: 'Updated Nermeen Product Description'
    };

    // Navigate to the website
    console.log('Navigating to the website...');
    await page.goto('https://e-commerce-kib.netlify.app');
    await page.waitForTimeout(5000);

    // Screenshot after navigating to the website
    const accessScreenshotPath = path.join(__dirname, 'screenshots', 'editProduct_accessWebsite.png');
    await page.screenshot({ path: accessScreenshotPath });
    console.log(`Screenshot taken and saved to ${accessScreenshotPath}`);

    // Search for the product to check if it exists
    console.log(`Searching for the product "${originalProductName}" to check if it exists...`);
    await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', originalProductName);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);

    // Screenshot after searching for the product
    const searchScreenshotPath = path.join(__dirname, 'screenshots', 'editProduct_searchProduct.png');
    await page.screenshot({ path: searchScreenshotPath });
    console.log(`Screenshot taken and saved to ${searchScreenshotPath}`);

    // Find the product item element
    const productItems = await page.$$('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer');
    let productItem: ElementHandle<HTMLElement | SVGElement> | null = null;

    for (const item of productItems) {
      const textContent = await item.textContent();
      if (textContent && textContent.includes(originalProductName)) {
        productItem = item;
        break;
      }
    }

    if (!productItem) {
      console.log(`Product "${originalProductName}" does not exist. Exiting script...`);
    } else {
      // Click the located product
      console.log('Clicking the located product...');
      await productItem.click();

      // Screenshot after clicking the located product
      const clickProductScreenshotPath = path.join(__dirname, 'screenshots', 'editProduct_clickProduct.png');
      await page.screenshot({ path: clickProductScreenshotPath });
      console.log(`Screenshot taken and saved to ${clickProductScreenshotPath}`);

      // Click the "Edit" button
      console.log('Clicking the "Edit" button...');
      await page.waitForSelector('.sc-jlZhew .card-actions button:nth-child(1) a svg', { timeout: 60000 });
      await page.click('.sc-jlZhew .card-actions button:nth-child(1) a svg');
      await page.waitForTimeout(5000);

      // Screenshot after clicking the "Edit" button
      const editButtonScreenshotPath = path.join(__dirname, 'screenshots', 'editProduct_clickEditButton.png');
      await page.screenshot({ path: editButtonScreenshotPath });
      console.log(`Screenshot taken and saved to ${editButtonScreenshotPath}`);

      // Update the product details
      console.log('Updating the product details...');
      await page.fill('#root > div > main > div > form > div:nth-child(2) > div:nth-child(1) > input', '');
      await page.fill('#root > div > main > div > form > div:nth-child(2) > div:nth-child(1) > input', updatedProductDetails.title);
      await page.waitForTimeout(3000);

      await page.fill('#root > div > main > div > form > div:nth-child(3) > div > input', '');
      await page.fill('#root > div > main > div > form > div:nth-child(3) > div > input', updatedProductDetails.price);
      await page.waitForTimeout(3000);

      await page.fill('#root > div > main > div > form > div:nth-child(2) > div:nth-child(2) > input', '');
      await page.fill('#root > div > main > div > form > div:nth-child(2) > div:nth-child(2) > input', updatedProductDetails.description);
      await page.waitForTimeout(3000);

      // Screenshot after updating the product details
      const updateDetailsScreenshotPath = path.join(__dirname, 'screenshots', 'editProduct_updateDetails.png');
      await page.screenshot({ path: updateDetailsScreenshotPath });
      console.log(`Screenshot taken and saved to ${updateDetailsScreenshotPath}`);

      // Click the "Save" button
      console.log('Clicking the "Save" button...');
      await page.click('#root > div > main > div > form > button');
      await page.waitForTimeout(5000);

      // Screenshot after clicking the "Save" button
      const saveButtonScreenshotPath = path.join(__dirname, 'screenshots', 'editProduct_clickSaveButton.png');
      await page.screenshot({ path: saveButtonScreenshotPath });
      console.log(`Screenshot taken and saved to ${saveButtonScreenshotPath}`);

      // Verify the updated product
      console.log('Verifying the updated product...');
      await page.fill('#root > div > header > div.sc-eqUAAy.sc-iGgWBj.cThJKC.hbCTxG.container.mx-auto.flex.items-center.justify-between > input', updatedProductDetails.title);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(5000);

      // Screenshot after verifying the updated product
      const verifyProductScreenshotPath = path.join(__dirname, 'screenshots', 'editProduct_verifyProduct.png');
      await page.screenshot({ path: verifyProductScreenshotPath });
      console.log(`Screenshot taken and saved to ${verifyProductScreenshotPath}`);

      const updatedProductExists = await page.$$eval('.sc-kpDqfm.hfQJgD.mt-4.cursor-pointer', (items, updatedProductDetails) =>
        items.some(item => item.textContent?.includes(updatedProductDetails.title)), updatedProductDetails
      );

      if (updatedProductExists) {
        console.log('Product edited successfully!');
      } else {
        console.log('Failed to edit the product.');
      }
    }

    await browser.close();
  }, 60000);  // Set a 60-second timeout for this test
});
