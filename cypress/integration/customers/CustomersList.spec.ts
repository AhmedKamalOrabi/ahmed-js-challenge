/// <reference types="cypress" />
import { translate } from '../../../src/constants';

describe('Customers: List Customers', () => {
  before(() => {
    cy.visit('/');
  });

  context('CustomBreadcrumbs and Customers Management Page', () => {
    it('test route path contain /customers after domain ', () => {
      cy.location('pathname').should('equal', '/customers');
    });

    it('test customers management has active class and /customers href', () => {
      cy.get('a.active')
        .should('have.attr', 'href', '/customers')
        .and('contain', translate('sidebar.customer.text'));
    });

    it('test breadcrumb contain Customer Management', () => {
      cy.get('.MuiBreadcrumbs-ol li')
        .eq(2)
        .should('have.text', translate('breadcrumb.customer.list'));
    });

    it('test page title to be Customers managment', () => {
      cy.get('h1').should('contain.text', translate('page.title.text'));
    });

    it('test Add new customer button to has proper text and go to create customer page', () => {
      cy.get('shore-button').as('newCustomerBtn');
      cy.get('@newCustomerBtn').should(
        'contain.text',
        translate('customer.button.add'),
      );
      cy.get('@newCustomerBtn').click();
      cy.location('pathname').should('equal', '/customers/create');
      cy.get('.MuiBreadcrumbs-ol li').eq(2).click();
    });
  });

  context('Customer List component', () => {
    it('Table is shown', () => {
      cy.get('shore-table').should('be.visible');
    });

    it('Check the length of table head', () => {
      cy.get('shore-table-head')
        .find('shore-table-cell')
        .should('have.length', 5);
    });

    it('Check table head text', () => {
      const customerTableHeadTexts = [
        'Name',
        'Phone',
        'Email',
        'Favorite Services',
        'Action',
      ];
      cy.get('shore-table-head')
        .find('shore-table-cell')
        .each((cell, index) => {
          cy.wrap(cell).should('have.text', customerTableHeadTexts[index]);
        });
    });

    it('Check table Rows length', () => {
      cy.get('shore-table-body')
        .find('shore-table-row')
        .should('have.length', 4);
    });

    it('Check table First Row Values', () => {
      cy.get('shore-table-body')
        .find('shore-table-row')
        .eq(0)
        .find('shore-table-cell')
        .eq(0)
        .should('have.text', 'Little My');
    });

    it('Test Edit button in First Row ', () => {
      cy.get('shore-table-body')
        .find('shore-table-row')
        .eq(0)
        .find('shore-table-cell')
        .eq(4)
        .find('button')
        .click();
      cy.location('pathname').should('include', '/update');
    });
  });
});
