import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage{
    readonly placeOrderButton: Locator;
    readonly totalCartAMount: Locator;
    readonly checkoutShortcutLink: Locator;

    constructor(page: Page){
        super(page);
        this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
        this.totalCartAMount = this.page.locator("//tr[.//td[contains(h4, 'Total Amount')]]//p");
        this.checkoutShortcutLink= this.page.locator('li.active');
    }

    async assertOnCheckoutPage(){
        await expect(this.checkoutShortcutLink).toBeVisible();
        expect(this.checkoutShortcutLink).toHaveText("Checkout");
    }

    async assertAddressInCheckout(address: string){
        await expect(this.page.locator('#address_delivery')
        .getByText(address, { exact: true})).toBeVisible();
    }

    async placeOrder(){
        await this.placeOrderButton.click();
    }

    async assertTotalAmount(totalAmount: number){
        expect(this.totalCartAMount).toContainText(totalAmount.toString());
    }
}