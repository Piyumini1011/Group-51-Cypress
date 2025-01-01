const { Then } = require('@badeball/cypress-cucumber-preprocessor');

Then("I should get a response with status code {int}", function(statusCode) {
    cy.get('@response').its('status').should('eq', statusCode);
});

Then("response should contain message {string}", function(message) {
    cy.get('@response').its('body').should('contain', message);
});