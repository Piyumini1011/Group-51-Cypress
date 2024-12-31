import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('open newtours application', () => {
  cy.visit('http://newtours.demoaut.com');
});
