import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('login to the demo account', () => {
  cy.visit('https://automationexercise.com/login');
  cy.get('[data-qa="login-email"]').type('kusal@gmail.com');
  cy.get('[data-qa="login-password"]').type('kusal123');
  cy.get('[data-qa="login-button"]').click();
  cy.get(':nth-child(10) > a').invoke('text').then((loggedInUser) => {
    expect(loggedInUser.trim()).to.contain('Kusal Nayanajith');
  })
});
