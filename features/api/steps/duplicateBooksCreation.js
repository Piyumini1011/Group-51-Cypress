const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// Base API URL for books
const API_URL = 'http://localhost:7081/api/books';

// Step to authenticate
Given("I am authenticated as {string} with password {string}", function (username, password) {
  cy.wrap({ username, password }).as('authCredentials');
});

// Step to create a new book
When("I create a new book with the following details:", function (dataTable) {
  const book = dataTable.hashes()[0];
  cy.get('@authCredentials').then(({ username, password }) => {
    cy.request({
      method: 'POST',
      url: API_URL,
      headers: { "Content-Type": "application/json" },
      auth: { username, password }, // Authentication with the provided credentials
      body: book,
      failOnStatusCode: false, // Don't fail the test if the status code is not 2xx
    }).as('createBookResponse');
  });
});

// Step to attempt creating the same book again
When("I attempt to create the same book again with the following details:", function (dataTable) {
  const book = dataTable.hashes()[0];
  cy.get('@authCredentials').then(({ username, password }) => {
    cy.request({
      method: 'POST',
      url: API_URL,
      headers: { "Content-Type": "application/json" },
      auth: { username, password }, // Authentication with the provided credentials
      body: book,
      failOnStatusCode: false, // Don't fail the test if the status code is not 2xx
    }).as('duplicateBookResponse');
  });
});

// Step to verify the response status code
Then("the response status code should be {int}", function (expectedStatusCode) {
  cy.get('@duplicateBookResponse').then((response) => {
    cy.log('Full Response:', JSON.stringify(response)); // Log the entire response object for debugging
    expect(response.status).to.eq(expectedStatusCode);
  });
});

// Step to verify the error message in the response body
Then("the response body should contain the error message {string}", function (errorMessage) {
  cy.get('@duplicateBookResponse').then((response) => {
    cy.log('Full Response:', JSON.stringify(response)); // Log the entire response object for debugging

    // Check if the body exists, then validate the error message
    if (response.body) {
      expect(response.body).to.include(errorMessage); // Assert that body contains the error message
    } else if (response.message) {
      expect(response.message).to.include(errorMessage); // If message is returned instead of body
    } else {
      throw new Error("Response body is undefined or does not contain the error message");
    }
  });
});
