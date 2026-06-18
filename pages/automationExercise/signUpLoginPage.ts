import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class SignUpLoginPage extends BasePage{
    readonly signUpNameField: Locator;
    readonly signUpEmailField: Locator;
    readonly signUpButton: Locator;
    readonly signUpHeading: Locator;

    constructor(page: Page){
        super(page);
        this.signUpNameField = this.page.getByRole('textbox', { name: 'Name' });
        this.signUpEmailField = this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = this.page.getByRole('button', { name: 'Signup' });
        this.signUpHeading = this.page.getByRole('heading', { name: "New User Signup!", level: 2});
    }

    async enterUserForSignUp(name: string, email: string){
        await this.signUpNameField.fill(name);
        await this.signUpEmailField.fill(email);
        await this.signUpButton.click();
    }

    async assertOnSignUpLoginPage(){
        await expect(this.signUpHeading).toBeVisible();
    }
}