const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const API_URL = 'http://localhost:7081/api/books';

When("I request the list of books with username {string} and password {string}", function(username, password) {
  const credentials = `${username}, ${password}`;
  cy.request({
    method: 'GET',
    url: API_URL,
    headers: {
      "Content-Type": "application/json", // Set headers as per your API requirements
    },
    auth: {
      username: username,
      password: password},
    failOnStatusCode: true, // Allow handling of non-200 responses
  }).as('response');
  cy.wrap({
        username: username,
        password: password
    }).as('loginCredentials');
});