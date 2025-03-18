import { Page } from '@playwright/test';

export interface Product {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
}

export class InventoryPage {
    private readonly page: Page;
    readonly sauceLabsBackpack: any;
    readonly fleeceJacket: any;

    // selectors
    private readonly selectors = {
        inventoryItem: '.inventory_item',
        itemName: '.inventory_item_name',
        itemDescription: '.inventory_item_desc',
        itemPrice: '.inventory_item_price',
        itemImage: '.inventory_item_img img',
        sortDropdown: '.product_sort_container',
        cartBadge: '.shopping_cart_badge',
        addToCartButton: 'button.btn_inventory',
        sauceLabsBackpack: '[data-test="item-4-img-link"]',
        fleeceJacket: '[data-test="item_5_img_link"]'
    };

    constructor(page: Page) {
        this.page = page;
        this.sauceLabsBackpack = this.page.locator(this.selectors.sauceLabsBackpack);
        this.fleeceJacket = this.page.locator(this.selectors.fleeceJacket);
    }

    async getProducts(): Promise<Product[]> {
        return await this.page.$$eval(this.selectors.inventoryItem, (items) => {
            return items.map((item) => ({
                name: item.querySelector('.inventory_item_name')?.textContent || '',
                description: item.querySelector('.inventory_item_desc')?.textContent || '',
                price: item.querySelector('.inventory_item_price')?.textContent || '',
                imageUrl: (item.querySelector('.inventory_item_img img') as HTMLImageElement)?.src || ''
            }));
        });
    }

    async addToCart(productName: string): Promise<void> {
        const button = this.page.locator(this.selectors.inventoryItem, {
            has: this.page.locator(this.selectors.itemName, {
                hasText: productName
            })
        }).locator(this.selectors.addToCartButton);

        await button.click();
    }

    async getCartCount(): Promise<number> {
        const badge = this.page.locator(this.selectors.cartBadge);
        if (await badge.count() === 0) return 0;
        return parseInt(await badge.textContent() || '0');
    }

    async sortProducts(sortOption: string): Promise<void> {
        await this.page.selectOption(this.selectors.sortDropdown, sortOption);
        await this.page.waitForTimeout(1000);
    }
} 