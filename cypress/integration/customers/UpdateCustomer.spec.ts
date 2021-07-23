/// <reference types="cypress" />
import { translate } from '../../../src/constants';
import { customers } from '../../../src/api';
import { ICustomer } from '../../../src/interfaces';

describe('Customers: Update Customer', () => {
  const goToUpdateFirstCustomer = () => {
    cy.get('shore-table-body')
      .find('shore-table-row')
      .eq(0)
      .find('shore-table-cell')
      .eq(4)
      .find('button')
      .click();
  };

  before(() => {
    cy.visit('/');
    goToUpdateFirstCustomer();
  });

  context('CustomBreadcrumbs and Update Customer Page', () => {
    it('test route path contain /customers/id/update after domain ', () => {
      cy.location('pathname').should('include', '/update');
    });

    it('test last breadcrumb contain Update', () => {
      cy.get('.MuiBreadcrumbs-ol li')
        .eq(4)
        .should('have.text', translate('breadcrumb.customer.update'));
    });

    it('test Customer managment breadcrumb go to /customers when clicked', () => {
      cy.get('.MuiBreadcrumbs-ol li')
        .eq(2)
        .should('have.text', translate('breadcrumb.customer.list'))
        .click();
      cy.location('pathname').should('equal', '/customers');
      goToUpdateFirstCustomer();
    });

    it('test page title to be Update Customer', () => {
      cy.get('h1').should('contain.text', translate('customer.update.title'));
    });
  });

  context('Customer Form component', () => {
    const resetForm = () => {
      cy.get('form').find('[name="name"]').as('name');
      cy.get('form').find('[name="email"]').as('email');
      cy.get('form').find('[name="phone"]').as('phone');
      cy.get('@name').clear();
      cy.get('@email').clear();
      cy.get('@phone').clear();
    };

    it('Test Update Valid Customer', () => {
      const updatedCustomer = {
        name: 'Ahmed Ragab updated',
        email: 'ahmed.ragdddddab037@gmail.com',
        phone: '01003635127',
        favoriteServices: ['Wash'],
      };
      const { name, email, phone, favoriteServices } = Object.values(
        customers,
      )[0] as ICustomer;
      cy.get('form').find('[name="name"]').as('name');
      cy.get('form').find('[name="email"]').as('email');
      cy.get('form').find('[name="phone"]').as('phone');
      cy.get('form')
        .find('[placeholder="Select one or more service"]')
        .as('services');
      cy.get('@name').should('have.value', name);
      cy.get('@email').should('have.value', email);
      cy.get('@phone').should('have.value', phone);
      cy.get('[role="button"].MuiChip-root')
        .should('have.length', favoriteServices.length)
        .eq(0)
        .find('.MuiChip-label')
        .should('have.text', favoriteServices[0].name);
      cy.get('@name')
        .clear()
        .type(updatedCustomer.name)
        .should('have.value', updatedCustomer.name);
      cy.get('@email')
        .clear()
        .type(updatedCustomer.email)
        .should('have.value', updatedCustomer.email);
      cy.get('@phone')
        .clear()
        .type(updatedCustomer.phone)
        .should('have.value', updatedCustomer.phone);
      cy.get('@services')
        .type(updatedCustomer.favoriteServices[0])
        .should('have.value', updatedCustomer.favoriteServices[0]);
      cy.get('#favorite-services-option-0').click();
      cy.contains('button', translate('customer.button.update')).click();
      cy.location('pathname').should('include', '/update');
    });

    it('Clear the Form and Test Click on Update button without enter any data', () => {
      resetForm();
      cy.contains('button', translate('customer.button.update')).click();
      cy.get('#input-text-name-Name-helper-text')
        .should('be.visible')
        .and('contain.text', translate('customer.error.name'));
      cy.get('@name').parent().should('have.class', 'Mui-error');
      cy.get('#input-email-email-Email-helper-text')
        .should('be.visible')
        .and('contain.text', translate('customer.error.email'));
      cy.get('@email').parent().should('have.class', 'Mui-error');
      cy.get('#input-text-phone-Phone-helper-text')
        .should('be.visible')
        .and('contain.text', translate('customer.error.phone'));
      cy.get('@phone').parent().should('have.class', 'Mui-error');
    });
  });
});
