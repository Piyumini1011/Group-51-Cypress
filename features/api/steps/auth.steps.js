// const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// const API_URL = 'http://localhost:7081/api/books';

// When("I request the list of books with username {string} and password {string}", function(username, password) {
//   const credentials = `${username}, ${password}`;
//   cy.request({
//     method: 'GET',
//     url: API_URL,
//     headers: {
//       "Content-Type": "application/json", // Set headers as per your API requirements
//     },
//     auth: {
//       username: username,
//       password: password},
//     failOnStatusCode: true, // Allow handling of non-200 responses
//   }).as('response');
//   cy.wrap({
//         username: username,
//         password: password
//     }).as('loginCredentials');
// });

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
      password: password
    },
    failOnStatusCode: true, // Allow handling of non-200 responses
  }).as('response');
  cy.wrap({
        username: username,
        password: password
    }).as('loginCredentials');
});

Then("the response should contain a list of books where each book has {string}, {string}, and {string}", function(idKey, titleKey, authorKey) {
  cy.get('@response').then(response => {
    // Check if the response body contains a list
    expect(response.body).to.be.an('array');
    response.body.forEach(book => {
      // Verify each book has the required keys
      expect(book).to.have.all.keys(idKey, titleKey, authorKey);
    });
  });
});
