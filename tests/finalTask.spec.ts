import { test as authTest } from "../fixtures/authenticatedShopPage";
import { expect, test as pwTest } from "@playwright/test";
import { ShopHomePage } from "../pages/automationExercise/shopHomePage";
import { firstUser } from "../utils/users";
import { ProductsPage } from "../pages/automationExercise/productsPage";
import { CheckoutPage } from "../pages/automationExercise/checkoutPage";
import { PaymentPage } from "../pages/automationExercise/paymentPage";
import { CartPage } from "../pages/automationExercise/cartPage";
import { ProductDetailPage } from "../pages/automationExercise/productDetailPage";
import { PaymentConfirmationPage } from "../pages/automationExercise/paymentConfirmationPage";
import { ShopAPIClients } from "../utils/shopApiClients";
import { generateUser } from "../utils/helpers";
import { epic, feature, story, severity, description } from "allure-js-commons";

authTest.describe('Final Task tests that depend on authenticated fixture',{ tag: ['@authenticated', '@shopping'] }, async()=>{
    authTest('TC-SHOP-001 — Happy path: full shopping flow', async ({ authenticatedShopPage })=>{
        await epic("Shopping");
        await feature("Checkout");
        await story("Full E2E flow");
        await severity("critical");
        const shopHomePage = new ShopHomePage(authenticatedShopPage);
        const productPage = new ProductsPage(authenticatedShopPage);
        const checkoutPage = new CheckoutPage(authenticatedShopPage);
        const paymentPage = new PaymentPage(authenticatedShopPage);
        const cartPage = new CartPage(authenticatedShopPage);
        const paymentConfirmationPage = new PaymentConfirmationPage(authenticatedShopPage);
        
        await shopHomePage.openProductsPage();
        await shopHomePage.dismissPopups(authenticatedShopPage);
        await productPage.assertOnProductsPage();
        await productPage.dismissPopups(authenticatedShopPage);
        await productPage.hoverOverAProduct(0);
        await productPage.addProductToCart(1);
        await productPage.viewCart();
        await cartPage.assertOnCartPage();
        await cartPage.proceedToCheckout();
        await checkoutPage.assertOnCheckoutPage();
        await checkoutPage.assertAddressInCheckout(firstUser.address);
        await checkoutPage.placeOrder();
        await paymentPage.dismissPopups(authenticatedShopPage);
        await paymentPage.assertOnPaymentPage();
        await paymentPage.fillPaymentForm(firstUser);
        await paymentConfirmationPage.assertConfirmationMessageIsDisplayed();
        await paymentConfirmationPage.assertUrlContains();
        await paymentConfirmationPage.assertOrderIdIsDisplayedInUrlPath();
    });

    authTest('TC-SHOP-003 — Cart: adding multiple products updates the item count', async({ authenticatedShopPage })=>{
        await epic("Shopping");
        await feature("Cart");
        await story("Add Multiple Products");
        await severity("normal");
        const shopHomePage = new ShopHomePage(authenticatedShopPage);
        const productPage = new ProductsPage(authenticatedShopPage);
        const cartPage = new CartPage(authenticatedShopPage);
        const checkoutPage = new CheckoutPage(authenticatedShopPage);

      
        await shopHomePage.openProductsPage();
        await productPage.assertOnProductsPage();
        await productPage.hoverOverAProduct(0);
        await productPage.addProductToCart(1);
        await productPage.continueWithShopping();
        await productPage.hoverOverAProduct(1);
        await productPage.addProductToCart(3);
        await productPage.viewCart();
        await cartPage.assertOnCartPage();
        await cartPage.assertCountOfRowsInCartTable(2);
        await cartPage.assertItemTitle(0, "Blue Top");
        await cartPage.assertItemTitle(1, "Men Tshirt");
        await cartPage.assertCartPriceOnItems(0, 500);
        await cartPage.assertCartPriceOnItems(1, 400);
        await cartPage.assertItemQuantityInCart(0, 1);
        await cartPage.assertItemQuantityInCart(1, 1);
        await cartPage.assertTotalPriceOnItem(0, 500);
        await cartPage.assertTotalPriceOnItem(1, 400);
        await cartPage.proceedToCheckout();
        await checkoutPage.assertOnCheckoutPage();
        await checkoutPage.assertTotalAmount(900);
    });

    authTest('TC-SHOP-010 — Session: authenticated user is redirected away from the login page', async({ authenticatedShopPage, user })=>{
        await epic("Auth");
        await feature("Session");
        await story("Redirect logged-in user");
        await severity("minor");
        const shopHomePage = new ShopHomePage(authenticatedShopPage);
        await shopHomePage.goto();
        expect(shopHomePage.page.url()).not.toContain("/login");
        await shopHomePage.dismissPopups(authenticatedShopPage);
        await shopHomePage.assertUserIsLoggedUponAccountCreation(user.name);
    })
});

pwTest.describe('Final Task tests that do not depend on the authenticated fixture', { tag: ['@non-authenticated', '@shoping'] }, async()=>{
    pwTest.beforeEach(async({ page })=>{
        const shopHomePage = new ShopHomePage(page);

        await shopHomePage.goto();
        await shopHomePage.giveConsent();
        await shopHomePage.assertOnHomePage();
    });
    pwTest('TC-SHOP-002 — Search: keyword search returns only matching products', async({ page })=>{
        // This test will fail due to a bug
        await epic("Shopping");
        await feature("Product Search");
        await story("Keyword search");
        await severity("normal");
        await description('This test will fail due to a bug on the site that shows products that dont include the keyword in their name!');
        const shopHomePage = new ShopHomePage(page);
        const productsPage = new ProductsPage(page);

        await shopHomePage.openProductsPage();
        await productsPage.assertOnProductsPage();
        await productsPage.searchProduct("dress");
        await productsPage.assertAllProductsTitlesContainKeyword("dress");
        await productsPage.assertAtLeastOneResultIsShown();
    });

    pwTest('TC-SHOP-004  — Cart: removing a product updates the cart', async({ page })=>{
        await epic("Shopping");
        await feature("Cart");
        await story("Remove Product");
        await severity("normal");
        const shopHomePage = new ShopHomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await shopHomePage.openProductsPage();
        await productsPage.dismissPopups(page);
        await productsPage.assertOnProductsPage();
        await productsPage.hoverOverAProduct(0);
        await productsPage.addProductToCart(1);
        await productsPage.viewCart();
        await cartPage.assertOnCartPage();
        await cartPage.removeItem();
        await cartPage.assertEmptyCartMessage();
        await cartPage.assertUserIsNotNavigatedBack();
    });

    pwTest('TC-SHOP-005  — Product detail: product information page shows correct data', async({ page })=>{
        await epic("Shopping");
        await feature("Product Detail");
        await story("View product info");
        await severity("minor");
        const shopHomePage = new ShopHomePage(page);
        const productsPage = new ProductsPage(page);
        const productDetailPage = new ProductDetailPage(page);

        await shopHomePage.openProductsPage();
        await productsPage.assertOnProductsPage();
        await productsPage.viewAProduct(2);
        await productDetailPage.assertProductHeadingIsVisibleAndNotEmpty();
        await productDetailPage.assertProductCharacteristicsAreVisibleAndNotEmpty();
        await productDetailPage.assertAddToCartButtonIsDisplayed();

    });

    pwTest('TC-SHOP-009 — Subscription: subscribing from the footer shows a success message', async({ page })=>{
        await epic("Marketing");
        await feature("Newsletter");
        await story("Footer subscription");
        await severity("minor");
        const shopHomePage = new ShopHomePage(page);
        const user = generateUser();

        await shopHomePage.enterEmailForSubscription(user.email);
        await shopHomePage.submitEmailForSubscription();
        await shopHomePage.assertSubscriptionSuccessAlert();
        await shopHomePage.assertSubscriptionEmailFieldIsCleared();
    });
});

pwTest.describe('API tests', { tag: ['@api'] }, async()=>{
    pwTest('TC-SHOP-006 - API: GET /api/productsList returns a valid product list', async({ request })=>{
        await epic("API");
        await feature("ProductsAPI");
        await story("List all products");
        await severity("critical");
        const api = new ShopAPIClients(request);
        const response = await api.getAllProducts();

        expect(response.responseCode).toBe(200);
        expect(Array.isArray(response.products)).toBeTruthy();
        expect(response.products.length).toBeGreaterThan(0);

        for (const product of response.products) {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('brand');
            expect(product).toHaveProperty('category');
        }

        const ids = response.products.map(product => product.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    pwTest('TC-SHOP-007 — API: POST /api/searchProduct returns matching results', async({ request })=>{
        // This test will due to a bug
        await epic("API");
        await feature("ProductsAPI");
        await story("Search products");
        await severity("normal");
        await description('This test will fail due to a bug on the site that shows products that dont include the keyword in their name!');

        const api = new ShopAPIClients(request);
        const response = await api.searchProduct("top");
        const regex = new RegExp("top", 'i');

        expect(response.responseCode).toBe(200);
        expect(Array.isArray(response.products)).toBeTruthy();
        for(const product of response.products){
            expect(product.name).toMatch(regex);
        }
    });

    pwTest('TC-SHOP-008 — API: POST /api/searchProduct with missing parameter returns 400', async({ request })=>{
        await epic("API");
        await feature("ProductsAPI");
        await story("Missing parameter");
        await severity("minor");
        const api = new ShopAPIClients(request);
        const expectedMessage = "Bad request, search_product parameter is missing in POST request.";

        const response = await api.searchProductWithoutProductParameter();
        expect(response.responseCode).toBe(400);
        expect(response.message).toBe(expectedMessage);
    });
});