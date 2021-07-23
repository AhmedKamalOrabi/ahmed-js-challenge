/// <reference types="cypress" />
import { translate } from '../../../src/constants';

describe('Customers: Create Customer', () => {
  before(() => {
    cy.visit('/customers/create');
  });

  context('CustomBreadcrumbs and Create Customer Page', () => {
    it('test route path contain /customers/create after domain ', () => {
      cy.location('pathname').should('equal', '/customers/create');
    });

    it('test last breadcrumb contain Create', () => {
      cy.get('.MuiBreadcrumbs-ol li')
        .eq(4)
        .should('have.text', translate('breadcrumb.customer.create'));
    });

    it('test Customer managment breadcrumb go to /customers when clicked', () => {
      cy.get('.MuiBreadcrumbs-ol li')
        .eq(2)
        .should('have.text', translate('breadcrumb.customer.list'))
        .click();
      cy.location('pathname').should('equal', '/customers');
      cy.get('shore-button').click();
    });

    it('test page title to be Create Customer', () => {
      cy.get('h1').should('contain.text', translate('customer.create.title'));
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
    it('Test name input as Controlled component', () => {
      const textValue = 'test';
      cy.get('form').find('[name="name"]').as('name');
      cy.get('@name').type(textValue).should('have.value', textValue);
      cy.get('@name').clear().focus().blur();
      cy.get('#input-text-name-Name-helper-text')
        .should('be.visible')
        .and('contain.text', translate('customer.error.name'));
      cy.get('@name').parent().should('have.class', 'Mui-error');
    });

    it('Test email input as Controlled component', () => {
      const textValue = 'test@gmail.com';
      const inValidEmail = 'invalid email @';
      cy.get('form').find('[name="email"]').as('email');
      cy.get('@email').type(textValue).blur().should('have.value', textValue);
      cy.get('@email').clear().focus().blur();
      cy.get('#input-email-email-Email-helper-text')
        .should('be.visible')
        .and('contain.text', translate('customer.error.email'));
      cy.get('@email').parent().should('have.class', 'Mui-error');
      cy.get('@email').clear().type(inValidEmail).blur();
      cy.get('#input-email-email-Email-helper-text')
        .should('be.visible')
        .and('contain.text', translate('customer.error.email.invalid'));
    });

    it('Test phone input as Controlled component', () => {
      const textValue = '01025930919';
      const inValidPhone = '33';
      cy.get('form').find('[name="phone"]').as('phone');
      cy.get('@phone').type(textValue).blur().should('have.value', textValue);
      cy.get('@phone').clear().focus().blur();
      cy.get('#input-text-phone-Phone-helper-text')
        .should('be.visible')
        .and('contain.text', translate('customer.error.phone'));
      cy.get('@phone').parent().should('have.class', 'Mui-error');
      cy.get('@phone').clear().type(inValidPhone).blur();
      cy.get('#input-text-phone-Phone-helper-text')
        .should('be.visible')
        .and('contain.text', translate('customer.error.phone.invalid'));
    });

    it('Test Services AutoComplete as Controlled component', () => {
      const washValue = 'wash';
      cy.get('form')
        .find('[placeholder="Select one or more service"]')
        .as('services');
      cy.get('@services').type(washValue).should('have.value', washValue);
      cy.get('#favorite-services-option-0').click();
      cy.get('#favorite-services-option-1').click();
      cy.get('[role="button"].MuiChip-root')
        .should('have.length', 2)
        .eq(0)
        .find('.MuiChip-label')
        .should('have.text', 'Wash');
    });

    it('Test Click on Create button without enter any data', () => {
      resetForm();
      cy.contains('button', translate('customer.button.create')).click();
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

    it('Test Create Valid Customer', () => {
      const customer = {
        name: 'Ahmed Ragab',
        email: 'ahmed.ragab037@gmail.com',
        phone: '201025930919',
        favoriteServices: ['Wash', 'Dye'],
      };
      cy.get('form').find('[name="name"]').as('name');
      cy.get('form').find('[name="email"]').as('email');
      cy.get('form').find('[name="phone"]').as('phone');
      cy.get('form')
        .find('[placeholder="Select one or more service"]')
        .as('services');
      cy.get('@name').clear().type(customer.name);
      cy.get('@email').clear().type(customer.email);
      cy.get('@phone').clear().type(customer.phone);
      const washValue = 'wash';
      cy.get('@services').type(washValue).should('have.value', washValue);
      cy.get('#favorite-services-option-0').click();
      cy.get('#favorite-services-option-1').click();
      cy.contains('button', translate('customer.button.create')).click();
      cy.location('pathname').should('equal', '/customers');
      cy.get('shore-table-body')
        .find('shore-table-row')
        .should('have.length', 5);
    });
  });
});
