import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { InventoryPage } from './pages/inventoryPage';
import { TestData } from './utils/testData';

/**
 * Interface representing a product item structure
 * @interface Product
 * @property {string} name - The display name of the product
 * @property {string} description - Detailed product description
 * @property {string} price - Product price in USD format ($XX.XX)
 * @property {string} imageUrl - Full URL to product image
 */

/**
 * Test suite for Sauce Demo application
 * Covers core functionality including:
 * - User authentication
 * - Product listing
 * - Sorting functionality
 * - Shopping cart operations
 * - Product details validation
 */
test.describe('Sauce Demo Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async () => {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
    });

    test('should login successfully', async () => {
        await loginPage.navigate();
        await loginPage.login(
            TestData.credentials.standardUser.username,
            TestData.credentials.standardUser.password
        );
        await expect(loginPage['page']).toHaveURL(/.*inventory.html/);
    });

    test('should load products', async () => {
        await loginPage.navigate();
        await loginPage.login(
            TestData.credentials.standardUser.username,
            TestData.credentials.standardUser.password
        );
        const products = await inventoryPage.getProducts();
        expect(products.length).toBeGreaterThan(0);
    });

    test('should sort products', async () => {
        await loginPage.navigate();
        await loginPage.login(
            TestData.credentials.standardUser.username,
            TestData.credentials.standardUser.password
        );
        await inventoryPage.sortProducts('za');
        const products = await inventoryPage.getProducts();
        expect(products[0].name > products[products.length - 1].name).toBeTruthy();
    });

    test('should add products to cart', async () => {
        await loginPage.navigate();
        await loginPage.login(
            TestData.credentials.standardUser.username,
            TestData.credentials.standardUser.password
        );
        const products = await inventoryPage.getProducts();
        await inventoryPage.addToCart(products[0].name);
        await inventoryPage.addToCart(products[1].name);
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(2);
    });

    test('should verify product details', async () => {
        await loginPage.navigate();
        await loginPage.login(
            TestData.credentials.standardUser.username,
            TestData.credentials.standardUser.password
        );
        const products = await inventoryPage.getProducts();
        for (const product of products) {
            expect(product.name).not.toBe('');
            expect(product.description).not.toBe('');
            expect(product.price).toMatch(/^\$/);
            expect(product.imageUrl).toContain('static/media/');
        }
    });
}); 