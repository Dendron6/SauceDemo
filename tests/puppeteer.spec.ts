import puppeteer from 'puppeteer';
import * as fs from 'fs';

async function scrapeSauceDemo() {
    // Запускаем браузер
    const browser = await puppeteer.launch({
        headless: false, // false - чтобы видеть процесс
        defaultViewport: null
    });

    try {
        // Создаем новую страницу
        const page = await browser.newPage();
        
        // Переходим на сайт
        await page.goto('https://www.saucedemo.com');

        // Логинимся
        await page.type('#user-name', 'standard_user');
        await page.type('#password', 'secret_sauce');
        await page.click('#login-button');

        // Ждем загрузки страницы с товарами
        await page.waitForSelector('.inventory_item');

        // Собираем данные о товарах
        const products = await page.evaluate(() => {
            const items = document.querySelectorAll('.inventory_item');
            return Array.from(items).map(item => {
                return {
                    name: item.querySelector('.inventory_item_name')?.textContent || '',
                    description: item.querySelector('.inventory_item_desc')?.textContent || '',
                    price: item.querySelector('.inventory_item_price')?.textContent || '',
                    imageUrl: (item.querySelector('.inventory_item_img img') as HTMLImageElement)?.src || ''
                };
            });
        });

        // display results
        console.log('Good found:', products.length);
        console.log('Information about goods:', JSON.stringify(products, null, 2));

        // save results to file
        fs.writeFileSync('saucedemo-products.json', JSON.stringify(products, null, 2));

        return products;

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Закрываем браузер
        await browser.close();
    }
}

// Запускаем скрипт
scrapeSauceDemo();
