import BOBasePage from '@pages/BO/BObasePage';

import {
  type Page,
} from '@prestashop-core/ui-testing';

/**
 * View attribute page, contains functions that can be used on the page
 * @class
 * @extends BOBasePage
 */
class ViewAttribute extends BOBasePage {
  public readonly pageTitle: (attributeName: string) => string;

  private readonly addNewValueLink: string;

  private readonly gridForm: string;

  private readonly gridTableHeaderTitle: string;

  private readonly gridTableNumberOfTitlesSpan: string;

  private readonly gridTable: string;

  private readonly filterRow: string;

  private readonly selectAllRowsDiv: string;

  private readonly filterColumn: (filterBy: string) => string;

  private readonly filterSearchButton: string;

  private readonly filterResetButton: string;

  private readonly tableBody: string;

  private readonly tableBodyRows: string;

  private readonly tableBodyRow: (row: number) => string;

  private readonly tableBodyColumn: (row: number) => string;

  private readonly tableColumnHandle: (row: number) => string;

  private readonly tableColumnId: (row: number) => string;

  private readonly tableColumnValue: (row: number) => string;

  private readonly tableColumnColor: (row: number) => string;

  private readonly tableColumnPosition: (row: number) => string;

  private readonly tableColumnActions: (row: number) => string;

  private readonly tableColumnActionsEditLink: (row: number) => string;

  private readonly tableColumnActionsToggleButton: (row: number) => string;

  private readonly tableColumnActionsDropdownMenu: (row: number) => string;

  private readonly tableColumnActionsDeleteLink: (row: number) => string;

  private readonly bulkActionsToggleButton: string;

  private readonly bulkActionsDeleteButton: string;

  private readonly bulkDeleteModal: string;

  private readonly bulkDeleteModalButton: string;

  private readonly paginationLimitSelect: string;

  private readonly paginationLabel: string;

  private readonly paginationPreviousLink: string;

  private readonly paginationNextLink: string;

  private readonly tableHead: string;

  private readonly sortColumnDiv: (column: string) => string;

  private readonly sortColumnSpanButton: (column: string) => string;

  private readonly deleteModalButtonYes: string;

  private readonly backToListLink: string;

  /**
   * @constructs
   * Setting up texts and selectors to use on view attribute page
   */
  constructor() {
    super();

    this.pageTitle = (attributeName: string) => `Attribute ${attributeName} • ${global.INSTALL.SHOP_NAME}`;

    // Header selectors
    this.addNewValueLink = '#page-header-desc-configuration-add';

    // Form selectors
    this.gridForm = '#attribute_grid_panel';
    this.gridTableHeaderTitle = `${this.gridForm} .card-header`;
    this.gridTableNumberOfTitlesSpan = `${this.gridTableHeaderTitle} h3.card-header-title`;

    // Table selectors
    this.gridTable = '#attribute_grid_table';

    // Filter selectors
    this.filterRow = `${this.gridTable} tr.column-filters`;
    this.selectAllRowsDiv = `${this.filterRow} .grid_bulk_action_select_all`;
    this.filterColumn = (filterBy: string) => `${this.filterRow} [name='attribute[${filterBy}]']`;
    this.filterSearchButton = `${this.filterRow} button.grid-search-button`;
    this.filterResetButton = `${this.filterRow} button.grid-reset-button`;

    // Table body selectors
    this.tableBody = `${this.gridTable} tbody`;
    this.tableBodyRows = `${this.tableBody} tr`;
    this.tableBodyRow = (row: number) => `${this.tableBodyRows}:nth-child(${row})`;
    this.tableBodyColumn = (row: number) => `${this.tableBodyRow(row)} td`;

    // Columns selectors
    this.tableColumnHandle = (row: number) => `${this.tableBodyColumn(row)}.column-position_handle div i`;
    this.tableColumnId = (row: number) => `${this.tableBodyColumn(row)}.column-id_attribute`;
    this.tableColumnValue = (row: number) => `${this.tableBodyColumn(row)}.column-name`;
    this.tableColumnColor = (row: number) => `${this.tableBodyColumn(row)}.column-color div`;
    this.tableColumnPosition = (row: number) => `${this.tableBodyColumn(row)}.column-position`;

    // Row actions selectors
    this.tableColumnActions = (row: number) => `${this.tableBodyColumn(row)}.column-actions`;
    this.tableColumnActionsEditLink = (row: number) => `${this.tableColumnActions(row)} a.grid-edit-row-link`;
    this.tableColumnActionsToggleButton = (row: number) => `${this.tableColumnActions(row)} a.dropdown-toggle`;
    this.tableColumnActionsDropdownMenu = (row: number) => `${this.tableColumnActions(row)} .dropdown-menu`;
    this.tableColumnActionsDeleteLink = (row: number) => `${this.tableColumnActionsDropdownMenu(row)} a.grid-delete-row-link`;

    // Bulk actions selectors
    this.bulkActionsToggleButton = `${this.gridForm} button.dropdown-toggle.js-bulk-actions-btn`;
    this.bulkActionsDeleteButton = `${this.gridForm} #attribute_grid_bulk_action_delete_selection`;
    this.bulkDeleteModal = '#attribute-grid-confirm-modal';
    this.bulkDeleteModalButton = `${this.bulkDeleteModal} button.btn-confirm-submit`;

    // Pagination selectors
    this.paginationLimitSelect = '#paginator_select_page_limit';
    this.paginationLabel = `${this.gridForm} .col-form-label`;
    this.paginationNextLink = `${this.gridForm} [data-role=next-page-link]`;
    this.paginationPreviousLink = `${this.gridForm} [data-role='previous-page-link']`;

    // Sort Selectors
    this.tableHead = `${this.gridTable} thead`;
    this.sortColumnDiv = (column: string) => `${this.tableHead} div.ps-sortable-column[data-sort-col-name='${column}']`;
    this.sortColumnSpanButton = (column: string) => `${this.sortColumnDiv(column)} span.ps-sort`;

    // Confirmation modal
    this.deleteModalButtonYes = '#attribute-grid-confirm-modal .modal-footer button.btn-confirm-submit';

    // Grid footer link
    this.backToListLink = `${this.gridForm} > .card-footer > a.btn`;
  }

  /* Header methods */

  /**
   * Go to add new value page
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async goToAddNewValuePage(page: Page): Promise<void> {
    await this.clickAndWaitForURL(page, this.addNewValueLink);
  }

  /* Filter methods */
  /**
   * Reset all filters
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async resetFilter(page: Page): Promise<void> {
    if (!(await this.elementNotVisible(page, this.filterResetButton, 2000))) {
      await this.clickAndWaitForLoadState(page, this.filterResetButton);
      await this.elementNotVisible(page, this.filterResetButton, 2000);
    }
  }

  /**
   * Get number of attribute values
   * @param page {Page} Browser tab
   * @return {Promise<number>}
   */
  getNumberOfElementInGrid(page: Page): Promise<number> {
    return this.getNumberFromText(page, this.gridTableNumberOfTitlesSpan);
  }

  /**
   * Reset and get number of attribute values
   * @param page {Page} Browser tab
   * @return {Promise<number>}
   */
  async resetAndGetNumberOfLines(page: Page): Promise<number> {
    await this.resetFilter(page);
    return this.getNumberOfElementInGrid(page);
  }

  /**
   * Filter table
   * @param page {Page} Browser tab
   * @param filterBy {string} Column to filter
   * @param value {string} Value to put on filter
   * @return {Promise<void>}
   */
  async filterTable(page: Page, filterBy: string, value: string): Promise<void> {
    await this.setValue(page, this.filterColumn(filterBy), value);
    await this.clickAndWaitForURL(page, this.filterSearchButton);
  }

  /* Column methods */
  /**
   * Get text column from table
   * @param page {Page} Browser tab
   * @param row {number} Row on table
   * @param columnName {string} Column to get text value
   * @return {Promise<string>}
   */
  async getTextColumn(page: Page, row: number, columnName: string): Promise<string> {
    let columnSelector: string;

    switch (columnName) {
      case 'id_attribute':
        columnSelector = this.tableColumnId(row);
        break;

      case 'name':
        columnSelector = this.tableColumnValue(row);
        break;

      case 'color':
        columnSelector = this.tableColumnColor(row);
        break;

      case 'position':
        columnSelector = this.tableColumnPosition(row);
        break;

      default:
        throw new Error(`Column ${columnName} was not found`);
    }
    if (columnName === 'color') {
      return this.getAttributeContent(page, columnSelector, 'style');
    }
    return this.getTextContent(page, columnSelector);
  }

  /**
   * Go to edit value page
   * @param page {Page} Browser tab
   * @param row {number} Row on table
   * @return {Promise<void>}
   */
  async goToEditValuePage(page: Page, row: number): Promise<void> {
    await this.clickAndWaitForURL(page, this.tableColumnActionsEditLink(row));
  }

  /**
   * Delete value
   * @param page {Page} Browser tab
   * @param row {number} Row on table
   * @return {Promise<string>}
   */
  async deleteValue(page: Page, row: number): Promise<string> {
    await Promise.all([
      page.locator(this.tableColumnActionsToggleButton(row)).click(),
      this.waitForVisibleSelector(page, this.tableColumnActionsDeleteLink(row)),
    ]);

    await page.locator(this.tableColumnActionsDeleteLink(row)).click();
    await this.waitForVisibleSelector(page, this.deleteModalButtonYes);

    // Confirm delete action
    await this.clickAndWaitForURL(page, this.deleteModalButtonYes);

    // Get successful message
    return this.getAlertSuccessBlockParagraphContent(page);
  }

  /**
   * Go back to list of attributes
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   * @constructor
   */
  async backToAttributesList(page: Page): Promise<void> {
    await this.clickAndWaitForURL(page, this.backToListLink);
  }

  /**
   * Change value position
   * @param page {Page} Browser tab
   * @param actualPosition {number} Value of actual position
   * @param newPosition {value} Value of new position
   * @return {Promise<string|null>}
   */
  async changePosition(page: Page, actualPosition: number, newPosition: number): Promise<string|null> {
    await this.dragAndDrop(
      page,
      this.tableColumnHandle(actualPosition),
      this.tableColumnHandle(newPosition),
      true,
    );

    return this.getAlertSuccessBlockParagraphContent(page);
  }

  /* Bulk actions methods */
  /**
   * Bulk delete attributes
   * @param page {Page} Browser tab
   * @return {Promise<string>}
   */
  async bulkDeleteValues(page: Page): Promise<string> {
    // Click on Select All
    await Promise.all([
      page.locator(this.selectAllRowsDiv).evaluate((el: HTMLElement) => el.click()),
      this.waitForVisibleSelector(page, `${this.bulkActionsToggleButton}:not([disabled])`),
    ]);
    // Click on Button Bulk actions
    await Promise.all([
      page.locator(this.bulkActionsToggleButton).click(),
      this.waitForVisibleSelector(page, `${this.bulkActionsToggleButton}[aria-expanded='true']`),
    ]);
    // Click on delete and wait for modal
    await Promise.all([
      page.locator(this.bulkActionsDeleteButton).click(),
      this.waitForVisibleSelector(page, `${this.bulkDeleteModal}.show`),
    ]);
    await this.clickAndWaitForLoadState(page, this.bulkDeleteModalButton);
    await this.elementNotVisible(page, this.bulkDeleteModal);

    return this.getAlertSuccessBlockParagraphContent(page);
  }

  /* Pagination methods */
  /**
   * Get pagination label
   * @param page {Page} Browser tab
   * @return {Promise<string>}
   */
  async getPaginationLabel(page: Page): Promise<string> {
    return this.getTextContent(page, this.paginationLabel);
  }

  /**
   * Select pagination limit
   * @param page {Page} Browser tab
   * @param number {number} Value of pagination limit to select
   * @returns {Promise<string>}
   */
  async selectPaginationLimit(page: Page, number: number): Promise<string> {
    const currentUrl: string = page.url();

    await Promise.all([
      this.selectByVisibleText(page, this.paginationLimitSelect, number),
      page.waitForURL((url: URL): boolean => url.toString() !== currentUrl, {waitUntil: 'networkidle'}),
    ]);

    return this.getPaginationLabel(page);
  }

  /**
   * Click on next
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async paginationNext(page: Page): Promise<string> {
    await this.clickAndWaitForURL(page, this.paginationNextLink);

    return this.getPaginationLabel(page);
  }

  /**
   * Click on previous
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async paginationPrevious(page: Page): Promise<string> {
    await this.clickAndWaitForURL(page, this.paginationPreviousLink);

    return this.getPaginationLabel(page);
  }

  /* Sort functions */
  /**
   * Sort table by clicking on column name
   * @param page {Page} Browser tab
   * @param sortBy {string} Column to sort with
   * @param sortDirection {string} Sort direction asc or desc
   * @return {Promise<void>}
   */
  async sortTable(page: Page, sortBy: string, sortDirection: string): Promise<void> {
    const sortColumnDiv = `${this.sortColumnDiv(sortBy)}[data-sort-direction='${sortDirection}']`;
    const sortColumnSpanButton = this.sortColumnSpanButton(sortBy);

    let i: number = 0;
    while (await this.elementNotVisible(page, sortColumnDiv, 2000) && i < 2) {
      await page.locator(this.sortColumnDiv(sortBy)).hover();
      await this.clickAndWaitForURL(page, sortColumnSpanButton);
      i += 1;
    }

    await this.waitForVisibleSelector(page, sortColumnDiv, 20000);
  }

  /**
   * Get content from all rows
   * @param page {Page} Browser tab
   * @param columnName {string} Column name to get all rows content
   * @return {Promise<Array<string>>}
   */
  async getAllRowsColumnContent(page: Page, columnName: string): Promise<string[]> {
    const rowsNumber = await this.getNumberOfElementInGrid(page);
    const allRowsContentTable: string[] = [];

    for (let i: number = 1; i <= rowsNumber; i++) {
      const rowContent = await this.getTextColumn(page, i, columnName);

      if (rowContent) {
        allRowsContentTable.push(rowContent);
      }
    }

    return allRowsContentTable;
  }
}

export default new ViewAttribute();
