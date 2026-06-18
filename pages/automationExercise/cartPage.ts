import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage{

    readonly proceedToCheckoutButton: Locator;
    readonly itemTitle: Locator;
    readonly cartTableRows: Locator;
    readonly cartPrice: Locator;
    readonly quantity: Locator;
    readonly totalItemPrice: Locator;
    readonly removeFromCartButton: Locator;
    readonly emptyCartMessage: Locator;
    readonly cartShortcutLink: Locator;

    constructor(page: Page){
        super(page);
        this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
        this.itemTitle = this.page.locator('.cart_description h4');
        this.cartTableRows = this.page.locator('tbody tr');
        this.cartPrice = this.page.locator('.cart_price p');
        this.quantity = this.page.locator('.cart_quantity button');
        this.totalItemPrice = this.page.locator('.cart_total p');
        this.removeFromCartButton = this.page.locator('a.cart_quantity_delete');
        this.emptyCartMessage = this.page.locator('span#empty_cart');
        this.cartShortcutLink = this.page.locator('li.active');
    }

    async assertOnCartPage(){
        await expect(this.cartShortcutLink).toBeVisible();
        expect(this.cartShortcutLink).toHaveText("Shopping Cart");
    }

    async proceedToCheckout(){
        await this.proceedToCheckoutButton.click();
    }

    async assertItemTitle(position: number, title: string){
        await expect(this.itemTitle.nth(position)).toHaveText(title);
    }

    async assertCountOfRowsInCartTable(rows: number){
        await expect(this.cartTableRows).toHaveCount(rows);
    }

    async assertCartPriceOnItems(position: number, price: number){
        await expect(this.cartPrice.nth(position)).toContainText(price.toString());
    }

    async assertItemQuantityInCart(position: number, quantity: number){
        const qty = await this.quantity.nth(position).textContent();
        expect(Number(qty)).toBe(quantity);
    }

    async assertTotalPriceOnItem(position: number, price:number){
        await expect(this.totalItemPrice.nth(position)).toContainText(price.toString());
    }

    async removeItem(position: number = 0){
        await this.removeFromCartButton.nth(position).click();
    }

    async assertEmptyCartMessage(){
        await expect(this.emptyCartMessage).toBeVisible();
        const message = await this.emptyCartMessage.textContent();
        expect(message).toContain("Cart is empty!");
    }

    async assertUserIsNotNavigatedBack(){
        expect(this.page.url()).toContain('/view_cart');
    }
}