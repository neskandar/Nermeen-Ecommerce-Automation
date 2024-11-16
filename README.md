# Nermeen E-commerce Automation Project

This project contains automated end-to-end tests for the Nermeen e-commerce application using Playwright and Jest.

## Project Overview

The goal of this project is to provide automated test coverage for key functionalities of the e-commerce application, ensuring reliability and consistency in user experience. The tests include scenarios for accessing the website, adding products, editing products, deleting products, and searching for products.

## Project Structure

- `tests/`: Contains the test scripts for various functionalities.
- `jest.config.js`: Jest configuration file that includes settings for test environment and report generation.
- `html-report/`: Contains the generated HTML report of the test execution.

## Scenarios Covered

1. **Access the Website**: Ensure the website is accessible.
2. **Add a New Product**: Test the functionality of adding a new product to the inventory.
3. **Edit a Product**: Test the functionality of editing an existing product.
4. **Delete a Product**: Test the functionality of deleting a product from the inventory.
5. **Search for a Product**: Verify that the search functionality returns relevant results for a specific product.
6. **Search with a Keyword Matching Multiple Products**: Verify that the search functionality returns relevant results for a keyword matching multiple products.

## Setup and Run

Follow these steps to set up and run the tests:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/neskandar/Nermeen-Ecommerce-Automation.git
   cd Nermeen-Ecommerce-Automation
