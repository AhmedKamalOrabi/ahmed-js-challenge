/// <reference types="cypress" />
import { translate } from '../../../src/constants';

describe('Customers: Material List Customers', () => {
  before(() => {
    cy.visit('/material/customers');
  });

  context('CustomBreadcrumbs and Customers Management Page', () => {
    it('test route path contain /material/customers after domain ', () => {
      cy.location('pathname').should('equal', '/material/customers');
    });

    it('test customers management has active class and /customers href', () => {
      cy.get('a.active')
        .should('have.attr', 'href', '/material/customers')
        .and('contain', translate('sidebar.material-customer.text'));
    });

    it('test breadcrumb contain Customer Management', () => {
      cy.get('.MuiBreadcrumbs-ol li')
        .eq(2)
        .should('have.text', translate('breadcrumb.material-customer.list'));
    });

    it('test page title to be Customers managment', () => {
      cy.get('h5').should('contain.text', translate('page.title.text'));
    });

    it('test Add new customer button to has proper text and go to create customer page', () => {
      cy.contains('button', translate('customer.button.add')).as(
        'newCustomerBtn',
      );
      cy.get('@newCustomerBtn').click();
      cy.location('pathname').should('equal', '/customers/create');
      cy.get('.MuiBreadcrumbs-ol li').eq(2).click();
    });
  });
});
