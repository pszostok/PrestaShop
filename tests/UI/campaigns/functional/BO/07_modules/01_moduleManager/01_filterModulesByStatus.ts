// Import utils
import helper from '@utils/helpers';
import testContext from '@utils/testContext';

// Import commonTests
import loginCommon from '@commonTests/BO/loginBO';

// Import pages
import dashboardPage from '@pages/BO/dashboard';
import moduleManagerPage from '@pages/BO/modules/moduleManager';

import {expect} from 'chai';
import {BrowserContext, Page} from 'playwright';

// Import data
import Modules from '@data/demo/modules';

const baseContext: string = 'functional_BO_modules_moduleManager_filterModulesByStatus';

describe('BO - Modules - Module Manager : Filter modules by status', async () => {
  let browserContext: BrowserContext;
  let page: Page;

  // before and after functions
  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);
    page = await helper.newTab(browserContext);
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  it('should login in BO', async function () {
    await loginCommon.loginBO(this, page);
  });

  it('should go to \'Modules > Module Manager\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToModuleManagerPage', baseContext);

    await dashboardPage.goToSubMenu(
      page,
      dashboardPage.modulesParentLink,
      dashboardPage.moduleManagerLink,
    );
    await moduleManagerPage.closeSfToolBar(page);

    const pageTitle = await moduleManagerPage.getPageTitle(page);
    await expect(pageTitle).to.contains(moduleManagerPage.pageTitle);
  });

  describe('Filter modules by status', async () => {
    it(`should uninstall the module '${Modules.contactForm.name}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'uninstallModule', baseContext);

      const successMessage = await moduleManagerPage.installUninstallModule(page, Modules.contactForm, false);
      await expect(successMessage).to.eq(`Uninstall action on module ${Modules.contactForm.tag} succeeded.`);
    });
    [
      {args: {status: 'enabled', result: true}},
      {args: {status: 'enabled', result: true}},
      {args: {status: 'disabled', result: false}},
      {args: {status: 'installed', result: true}},
      {args: {status: 'uninstalled', result: false}},
    ].forEach((test, index: number) => {
      it(`should filter by status : '${test.args.status}'`, async function () {
        await testContext.addContextItem(this, 'testIdentifier', `filterByStatus${index}`, baseContext);

        await moduleManagerPage.filterByStatus(page, test.args.status);

        const modules = await moduleManagerPage.getAllModulesStatus(page, test.args.status);
        modules.map(
          (module) => expect(
            module.status,
            `'${Modules.contactForm.name}' is not ${test.args.result ? 'enabled' : 'disabled'}`,
          ).to.equal(test.args.result),
        );
      });
    });

    it(`should install the module '${Modules.contactForm.name}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'installModule', baseContext);

      const successMessage = await moduleManagerPage.installUninstallModule(page, Modules.contactForm, true);
      await expect(successMessage).to.eq(`Install action on module ${Modules.contactForm.tag} succeeded.`);
    });

    it('should show all modules and check the different blocks', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'showAllModules', baseContext);

      await moduleManagerPage.filterByStatus(page, 'all-Modules');

      const blocksNumber = await moduleManagerPage.getNumberOfBlocks(page);
      await expect(blocksNumber).greaterThan(2);
    });
  });
});
