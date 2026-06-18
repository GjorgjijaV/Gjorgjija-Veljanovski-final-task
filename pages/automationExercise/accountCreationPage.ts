import { expect, Locator, Page } from "playwright/test";
import { User } from "../../utils/users";
import { BasePage } from "./basePage";

export class AccountCreationPage extends BasePage{
    readonly pageHeading: Locator;
    readonly maleTitleRadioButton: Locator;
    readonly passwordField: Locator;
    readonly dayDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;
    readonly createAccountButton: Locator;

    // Address Information block
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly addressField: Locator;
    readonly countryDropdown: Locator;
    readonly stateField: Locator;
    readonly cityField: Locator;
    readonly zipCode: Locator;
    readonly mobileNumber: Locator;

    // Confirmation page
    readonly accountCreated: Locator;
    readonly continueButton: Locator;


    constructor(page: Page){
        super(page)
        this.maleTitleRadioButton = this.page.getByRole('radio', { name: 'Mr.' });
        this.passwordField = this.page.locator('[data-qa="password"]');
        this.dayDropdown = this.page.locator('#days');
        this.monthDropdown = this.page.locator('#months');
        this.yearDropdown = this.page.locator('#years');
        this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
        this.firstNameField = this.page.locator('[data-qa="first_name"]');
        this.lastNameField = this.page.locator('[data-qa="last_name"]');
        this.addressField = this.page.locator('[data-qa="address"]');
        this.countryDropdown = this.page.locator('[data-qa="country"]');
        this.stateField = this.page.locator('[data-qa="state"]');
        this.zipCode = this.page.locator('[data-qa="zipcode"]');
        this.cityField = this.page.locator('[data-qa="city"]');
        this.mobileNumber = this.page.locator('[data-qa="mobile_number"]');
        this.accountCreated = this.page.getByText('Account Created!');
        this.continueButton = this.page.getByRole('link', { name: 'Continue' });
        this.pageHeading = this.page.getByRole('heading', { name: "Enter Account Information", level: 2});
    }

    async assertOnAccountCreationPage(){
        await expect(this.pageHeading).toBeVisible();
    }

    async fillAccountCreationForm(user: User){
        await this.maleTitleRadioButton.click();
        await this.passwordField.fill(user.password);
        await this.dayDropdown.selectOption(user.day.toString());
        await this.monthDropdown.selectOption(user.month.toString())
        await this.yearDropdown.selectOption(user.year.toString());
        await this.firstNameField.fill(user.firstName);
        await this.lastNameField.fill(user.lastName);
        await this.addressField.fill(user.address);
        await this.countryDropdown.selectOption(user.country);
        await this.stateField.fill(user.state);
        await this.cityField.fill(user.city);
        await this.zipCode.fill(user.zipCode.toString());
        await this.mobileNumber.fill(user.mobileNumber.toString());
    }

    async createAccount(){
        await this.createAccountButton.click();
    }

    async assertAccountHasBeenSuccessfullyCreated(){
        await expect(this.accountCreated).toBeVisible({ timeout: 10000});
        await expect(this.page).toHaveURL('/account_created');
    }

    async continueAfterConfirmation(){
        await this.continueButton.click();
    }

}