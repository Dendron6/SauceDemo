import puppeteer from 'puppeteer';

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

        // Выводим результаты
        console.log('Найдено товаров:', products.length);
        console.log('Данные о товарах:', JSON.stringify(products, null, 2));

        // Сохраняем результаты в файл
        const fs = require('fs');
        fs.writeFileSync('saucedemo-products.json', JSON.stringify(products, null, 2));

        return products;

    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        // Закрываем браузер
        await browser.close();
    }
}

// Запускаем скрипт
scrapeSauceDemo();
