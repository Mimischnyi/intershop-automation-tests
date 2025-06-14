const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { authorizationUserAndAddItemInCart, completionForm } = require("../utils/helpers")

describe("Testing order processing page", async function () {

    it("Testing order processing", async function () {

        await authorizationUserAndAddItemInCart("daasdasd23", "123456");

        const buttonArrangeLocator = By.css("a.checkout-button.button.alt.wc-forward");
        const titleOrderLocator = By.css("span.current");
        const buttonApplyOrderLocator = By.css("button.button.alt");
        const titleSuccesOrderLocator = By.css("article#post-24 h2");


        await driver.findElement(buttonArrangeLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/checkout/", "Wrong page");

        const titleOrder = await driver.findElement(titleOrderLocator).getText();
        expect(titleOrder).to.be.equal("Оформление Заказа", "Wrong title");

        // ================================Заполнение формы=================================================
        const userFirstNameLocator = By.css("input#billing_first_name");
        const userLastNameLocator = By.css("input#billing_last_name");
        const userAddressLocator = By.css("input#billing_address_1");
        const userCityLocator = By.css("input#billing_city");
        const userStateLocator = By.css("input#billing_state");
        const userPostcodeLocator = By.css("input#billing_postcode");
        const userPhoneLocator = By.css("input#billing_phone");
        const userCommentLocator = By.css("textarea#order_comments");

        await driver.findElement(userFirstNameLocator).sendKeys("Alex");
        await driver.findElement(userLastNameLocator).sendKeys("Ivanov");
        await driver.findElement(userCommentLocator).sendKeys("Good!!!");
        await driver.findElement(userAddressLocator).sendKeys("Sovetskaya");
        await driver.findElement(userCityLocator).sendKeys("London");
        await driver.findElement(userStateLocator).sendKeys("Holms");

        await driver.executeScript("arguments[0].scrollIntoView(true)",
            await driver.findElement(userPostcodeLocator)
        )

        await driver.findElement(userPostcodeLocator).sendKeys("2779900");
        await driver.findElement(userPhoneLocator).sendKeys("+7-999-123-12-12");

        // ===================================================================================
        await driver.executeScript("arguments[0].scrollIntoView(true)",
            await driver.findElement(buttonApplyOrderLocator)
        )

        await driver.sleep(2000);

        await driver.findElement(buttonApplyOrderLocator).click();

        const titleSuccesOrder = await driver.findElement(titleSuccesOrderLocator);
        expect(await titleSuccesOrder.isDisplayed(), "Title is missing").to.be.true;

    })

    // ============================================================================================

    it("Testing coupon entry", async function () {

        await authorizationUserAndAddItemInCart("daasdasd23", "123456");

        const buttonArrangeLocator = By.css("a.checkout-button.button.alt.wc-forward");
        const titleOrderLocator = By.css("span.current");
        const buttonCouponLocator = By.css("a.showcoupon");
        const fieldCouponLocator = By.css("input#coupon_code");
        const buttonApplyCouponLocator = By.css("button[name='apply_coupon']");
        const messageSuccesCouponeLocator = By.css("div.woocommerce-message");
        const addFieldCouponLocator = By.css("tr.cart-discount.coupon-sert500");

        await driver.findElement(buttonArrangeLocator).click();

        expect(await driver.getCurrentUrl()).to.be.equal("https://intershop5.skillbox.ru/checkout/", "Wrong page");

        const titleOrder = await driver.findElement(titleOrderLocator).getText();
        expect(titleOrder).to.be.equal("Оформление Заказа", "Wrong title");

        await driver.findElement(buttonCouponLocator).click();
        await driver.findElement(fieldCouponLocator).sendKeys("sert500");

        await driver.findElement(buttonApplyCouponLocator).click();

        const messageSuccesCoupone = await driver.findElement(messageSuccesCouponeLocator).getText();
        expect(messageSuccesCoupone).to.be.equal("Купон успешно добавлен.", "Message is missing");

        const addFieldCoupon = await driver.findElement(addFieldCouponLocator).getText();
        expect(addFieldCoupon).to.be.equal("СКИДКА: SERT500 -500,00₽ [Удалить]", "Message is missing");

    })
})