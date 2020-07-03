const dotenv = require('dotenv').config();
const { webkit, firefox } = require('playwright');
const {
    GARBAGE__COMPANY_WEBSITE,
    GARBAGE__USERNAME,
    GARBAGE__PASSWORD,
} = dotenv.parsed;

async function waitFor(page, arg) {
    try {
        await page.waitForSelector(arg);
    } catch (err) {
        console.error('Wait Error:', err);
    }
}

async function click(page, arg) {
    try {
        await page.click(arg);
    } catch (err) {
        console.error('Click error:', err);
    }
}

async function fill(page, input, value) {
    try {
        await page.fill(input, value);
    } catch (err) {
        console.error('Click error:', err);
    }
}

const payBillNavSelector =
    '#menu-main-menu-1 > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-4734.nav-item > a';
const loginButton =
    '#ctl00_MainContent_LoginBox > div:nth-child(4) > div.LoginButtonOuter';
const usernameInputBox = '#ctl00_MainContent_txtUserID';
const passwordInputBox = '#ctl00_MainContent_txtPassword';
const paymentButton =
    '#ctl00_MainContent_tblButtons > tbody > tr > td:nth-child(1) > input';
const paymentAmountInputBox =
    '#ctl00_MainContent_paymentProcess_MainContainer > div:nth-child(3) > div.paymentSectionHeader.headerTextStyle > span';

(async () => {
    const browser = await webkit.launch();
    const page = await browser.newPage();

    await page.goto(GARBAGE__COMPANY_WEBSITE);

    // Click on "Pay Bill" in navigation bar
    await click(page, payBillNavSelector);

    // Wait for "Login" button
    await waitFor(page, loginButton);

    // Fill password and username
    await fill(page, usernameInputBox, GARBAGE__USERNAME);
    await fill(page, passwordInputBox, GARBAGE__PASSWORD);

    // Login
    await click(page, loginButton);

    // Wait for and click on payment button
    await waitFor(page, paymentButton);
    await click(page, paymentButton);

    // Wait for payment form
    await waitFor(page, paymentAmountInputBox);

    await page.screenshot({ path: `example.png` });
    await browser.close();
})();
