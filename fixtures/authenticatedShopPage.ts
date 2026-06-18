import { test as base, expect, Page } from "@playwright/test";
import { SignUpLoginPage } from "../pages/automationExercise/signUpLoginPage";
import { ShopHomePage } from "../pages/automationExercise/shopHomePage";
import { AccountCreationPage } from "../pages/automationExercise/accountCreationPage";
import { firstUser } from "../utils/users";
import { generateUser } from "../utils/helpers";
import { ShopAPIClients } from "../utils/shopApiClients";

export type AuthenticatedPageFixture = {
    authenticatedShopPage: Page;
    user: ReturnType<typeof generateUser>;
}


export const test = base.extend<AuthenticatedPageFixture>({
   user: async ({}, use) => {
    const user = generateUser();
    await use(user);
  },
  authenticatedShopPage: async ({ page, request , user}, use) => {
    const loginPage = new SignUpLoginPage(page);
    const shopHomePage = new ShopHomePage(page);
    const accountCreationPage = new AccountCreationPage(page);

    await shopHomePage.goto();
    await shopHomePage.giveConsent();
    await shopHomePage.dismissPopups(page);
    await shopHomePage.assertOnHomePage();
    await shopHomePage.openLoginPage();
    await loginPage.assertOnSignUpLoginPage();
    await loginPage.enterUserForSignUp(user.name, user.email);
    await accountCreationPage.assertOnAccountCreationPage();
    await accountCreationPage.fillAccountCreationForm(firstUser);
    await accountCreationPage.createAccount();
    await accountCreationPage.assertAccountHasBeenSuccessfullyCreated();
    await accountCreationPage.continueAfterConfirmation();
    await shopHomePage.assertUserIsLoggedUponAccountCreation(user.name);

    try {
      await use(page);
    } finally {
      const api = new ShopAPIClients(request);
      const response = await api.deleteUserAccount(user.email, firstUser.password);
      expect(response.message).toBe("Account deleted!");
    }
  },
});