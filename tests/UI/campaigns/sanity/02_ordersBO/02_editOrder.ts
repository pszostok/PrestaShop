// Import utils
import testContext from '@utils/testContext';

// Import commonTests
import loginCommon from '@commonTests/BO/loginBO';

// Import pages
import orderPageProductsBlock from '@pages/BO/orders/view/productsBlock';

import {
  boDashboardPage,
  boOrdersPage,
  dataOrderStatuses,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

import {expect} from 'chai';
import type {BrowserContext, Page} from 'playwright';

const baseContext: string = 'sanity_ordersBO_editOrder';

/*
  Connect to the BO
  Edit the first order
  Logout from the BO
 */
describe('BO - Orders - Orders : Edit Order BO', async () => {
  let browserContext: BrowserContext;
  let page: Page;

  // before and after functions
  before(async function () {
    browserContext = await utilsPlaywright.createBrowserContext(this.browser);
    page = await utilsPlaywright.newTab(browserContext);
  });

  after(async () => {
    await utilsPlaywright.closeBrowserContext(browserContext);
  });

  // Steps
  it('should login in BO', async function () {
    await loginCommon.loginBO(this, page);
  });

  it('should go to the \'Orders > Orders\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToOrdersPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.ordersParentLink,
      boDashboardPage.ordersLink,
    );
    await boOrdersPage.closeSfToolBar(page);

    const pageTitle = await boOrdersPage.getPageTitle(page);
    expect(pageTitle).to.contains(boOrdersPage.pageTitle);
  });

  it('should go to the first order page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToFirstOrder', baseContext);

    await boOrdersPage.goToOrder(page, 1);

    const pageTitle = await orderPageProductsBlock.getPageTitle(page);
    expect(pageTitle).to.contains(orderPageProductsBlock.pageTitle);
  });

  it('should modify the product quantity and check the validation', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'editOrderQuantity', baseContext);

    const newQuantity = await orderPageProductsBlock.modifyProductQuantity(page, 1, 5);
    expect(newQuantity, 'Quantity was not updated').to.equal(5);
  });

  it('should modify the order status and check the validation', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'editOrderStatus', baseContext);

    const orderStatus = await orderPageProductsBlock.modifyOrderStatus(page, dataOrderStatuses.paymentAccepted.name);
    expect(orderStatus).to.equal(dataOrderStatuses.paymentAccepted.name);
  });

  // Logout from BO
  it('should log out from BO', async function () {
    await loginCommon.logoutBO(this, page);
  });
});
