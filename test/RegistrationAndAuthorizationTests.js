const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { authorizationUser, registrationUser } = require("../utils/helpers")

describe("Testing registration and authorization", async function () {

    it("Testing authorization", async function () {

        await driver.get("https://intershop5.skillbox.ru/")

        const enterLocator = By.css("a.account");
        const titleMyAccLocator = By.css("h2.post-title");
        const userNameOrEmailFieldLocator = By.css("input#username");
        const userPasswordFieldLocator = By.css("input#password");
        const buttonEnterLocator = By.css("button[name='login']");
        const helloTitleLocator = By.css("div.woocommerce-MyAccount-content > p:nth-child(2)");

        await driver.findElement(enterLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/my-account/", "Wrong page");

        const titleMyAcc = await driver.findElement(titleMyAccLocator).getText();
        expect(titleMyAcc).to.be.equal("Мой аккаунт", "Wrong title");

        await driver.findElement(userNameOrEmailFieldLocator).sendKeys("testerok");
        await driver.findElement(userPasswordFieldLocator).sendKeys("123456");
        await driver.findElement(buttonEnterLocator).click();

        const helloTitle = await driver.findElement(helloTitleLocator).getText();
        expect(helloTitle).to.be.equal("Привет testerok (Выйти)", "Wrong title");

    })

    it("Testing registration with a registered email", async function () {

        await registrationUser("testerok", "testerok@mail.com", "123456");

        const titleErrorRegistrationLocator = By.css("ul.woocommerce-error > li");

        const titleErrorRegistration = await driver.findElement(titleErrorRegistrationLocator).getText();
        expect(titleErrorRegistration).to.be.equal(
            "Error: Учетная запись с такой почтой уже зарегистировавана. Пожалуйста авторизуйтесь.", "Wrong title");

    })

    it("Testing registration with a empty fields", async function () {

        await registrationUser("", "", "");

        await driver.get("https://intershop5.skillbox.ru/")

        const titleErrorRegistrationLocator = By.css("ul.woocommerce-error > li");

        const titleErrorRegistration = await driver.findElement(titleErrorRegistrationLocator).getText();
        expect(titleErrorRegistration).to.be.equal(
            "Error: Пожалуйста, введите корректный email.", "Wrong title");

    })

    it("Testing registration with a name longer than 20 characters", async function () {

        await registrationUser("AliaksandrSergeevicIvanov", "aliaksanivan@mail.ru", "123456789");

        await driver.get("https://intershop5.skillbox.ru/")

        const titleErrorRegistrationLocator = By.css("ul.woocommerce-error > li");

        const titleErrorRegistration = await driver.findElement(titleErrorRegistrationLocator).getText();
        expect(titleErrorRegistration).to.be.equal(
            "Error: Максимальное допустимое количество символов: 20", "Wrong title");

    })

    it("Testing authorization with a empty fields", async function () {

        await authorizationUser("", "");

        const errorTitleLocator = By.css("ul.woocommerce-error > li");
        const errorTitle = await driver.findElement(errorTitleLocator).getText();
        expect(errorTitle).to.be.equal("Error: Имя пользователя обязательно.", "Wrong title");

    })

    it("Testing authorization with a empty password field", async function () {

        await authorizationUser("user", "");

        const errorTitleLocator = By.css("ul.woocommerce-error > li");
        const errorTitle = await driver.findElement(errorTitleLocator).getText();
        expect(errorTitle).to.be.equal("Пароль обязателен.", "Wrong title");

    })


})