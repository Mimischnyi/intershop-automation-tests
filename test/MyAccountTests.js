const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { authorizationUser } = require("../utils/helpers")

describe("Testing my account page", async function () {

    it("Testing switching personal account tabs", async function () {

        await authorizationUser("testerok", "123456");

        const buttonUserDataLocator = By.css("li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--edit-account > a");
        const titleUserDataLocator = By.css("h2.post-title");

        await driver.findElement(buttonUserDataLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/my-account/edit-account/", "Wrong page");
        const titleUserData = await driver.findElement(titleUserDataLocator).getText();
        expect(titleUserData).to.be.equal("Данные учетной записи", "Wrong title");

    })

    it("Testing log out of account", async function () {

        await authorizationUser("testerok", "123456");

        const buttonExitLocator = By.css("nav.woocommerce-MyAccount-navigation li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a");
        const buttonEntryLocator = By.css("div.login-woocommerce");

        await driver.findElement(buttonExitLocator).click();

        const buttonEntry = await driver.findElement(buttonEntryLocator);
        expect(await buttonEntry.isDisplayed(), "Button is missing").to.be.true;

    })
})