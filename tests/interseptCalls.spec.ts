import { test, expect } from '@playwright/test';
// npx playwright test tests/interseptCalls.spec.ts

// test('Verify api object', async ({ page }) => {
//     const response = await page.request.get('https://reqres.in/api/users/2');
//     const json = await response.json();
//     console.log("This is the response");
//     console.log(json);
// });


test('intercept calls with response', async ({ page }) => {


    // Method 1: Use response listener this function waits for the response to be received
    page.on('response', async (response) => {
        if (response.url().includes('reqres.in/api/users/2')) {
            const responseBody = await response.json();
            console.log('📥 Response received:', {
                status: response.status(),
                url: response.url(),
                body: responseBody
            });
        }
    });

    // Set up the route to intercept request
    await page.route('https://reqres.in/api/users/2', (route) => {
        const request = route.request();
        console.log('📤 Request intercepted:', {
          url: request.url(),
          method: request.method(),
          postData: request.postData(),
        });
    
        // Continue with the original request
        route.continue();
    });
    await page.goto('https://reqres.in/');
    await page.locator('[data-id="users-single"]').click();
   
});

// test('monitor all requests', async ({ page }) => {
//     // Listen to all requests
//     page.on('request', request => {
//         console.log('Request:', request.method(), request.url());
//     });

//     // Listen to all responses
//     page.on('response', response => {
//         console.log('Response:', response.status(), response.url());
//         if (response.url().includes('reqres.in/api/users/2')) {
//             console.log('Found our API call!');
//         }
//     });

//     await page.goto('https://reqres.in/');
//     await page.locator('[data-id="users-single"]').click();
    
//     // Wait a bit to see the logs
//     await page.waitForTimeout(2000);
// });
