const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const API_URL = 'http://localhost:7081/api/books';

Given('I navigate to the Library API', () => {
  // No additional checks here, we'll handle it in the When step
});

When('I login with username {string} and password {string}', (username, password) => {
  const credentials = btoa(`${username}:${password}`); // Encode username and password

  cy.request({
    method: 'GET',
    url: API_URL,
    headers: {
      Authorization: `Basic ${credentials}`, // Pass encoded credentials
    },
    failOnStatusCode: false, // Allow handling of non-200 responses
  }).as('loginResponse');
});

Then('I should receive a success response', () => {
  cy.get('@loginResponse').then((response) => {
    // Expect a successful response status
    expect(response.status).to.eq(200);
    // Optionally, validate the response body or headers
  });
});
