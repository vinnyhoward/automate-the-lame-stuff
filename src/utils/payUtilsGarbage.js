const dotenv = require('dotenv').config();
const { webkit, firefox } = require('playwright');
const { GARBAGE_COMPANY_WEBSITE } = dotenv.parsed;

(async () => {
    const browser = await webkit.launch();
    const page = await browser.newPage();
    await page.goto(GARBAGE_COMPANY_WEBSITE);

    await page.click(
        '#menu-main-menu-1 > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-4734.nav-item > a',
    );

    await page.waitForSelector(
        '#ctl00_MainContent_LoginBox > div:nth-child(1) > div',
    );

    await page.screenshot({ path: `example.png` });
    await browser.close();
})();
