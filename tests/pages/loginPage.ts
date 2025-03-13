import { Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Селекторы
    private readonly selectors = {
        usernameInput: '#user-name',
        passwordInput: '#password',
        loginButton: '#login-button'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username: string, password: string) {
        await this.page.fill(this.selectors.usernameInput, username);
        await this.page.fill(this.selectors.passwordInput, password);
        await this.page.click(this.selectors.loginButton);
        await this.page.waitForURL('**/inventory.html');
    }
} 