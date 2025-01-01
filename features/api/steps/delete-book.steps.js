const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const API_URL = 'http://localhost:7081/api/books';

Given("I request the list of books with username {string} and password {string}", function(username, password) {
  cy.request({
    method: 'GET',
    url: API_URL,
    auth: {
      username: username,
      password: password,
    },
    failOnStatusCode: false, // Allow handling non-2xx responses
  }).as('response');
  cy.wrap({ username, password }).as('loginCredentials');
});

When("I send a DELETE request for the book with ID {string}", function(bookId) {
  cy.get('@loginCredentials').then(({ username, password }) => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/${bookId}`,
      auth: {
        username: username,
        password: password,
      },
      failOnStatusCode: false,
    }).as('response');
  });
});

When("I send a DELETE request for the book with ID {string} without authentication", function(bookId) {
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/${bookId}`,
    failOnStatusCode: false,
  }).as('response');
});

Then("I should get a response with status code {int}", function(statusCode) {
  cy.get('@response').its('status').should('eq', statusCode);
});

Then("the response should contain message {string}", function(message) {
  cy.get('@response').its('body').should('contain', message);
});
