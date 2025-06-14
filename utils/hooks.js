const { Builder } = require("selenium-webdriver");
const edge = require('selenium-webdriver/edge');

exports.mochaHooks = {
    beforeEach: async function () {
        const options = new edge.Options();
        options.addArguments("--inprivate"); // Приватный режим
        options.addArguments("--start-maximized"); // Запуск в полноэкранном режиме

        driver = await new Builder().forBrowser("MicrosoftEdge").setEdgeOptions(options).build();

        // неявное ожидание
        await driver.manage().setTimeouts({ implicit: 5000 });
    },

    afterEach: async function () {
        await driver.quit();
    }
};