const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const API_URL = 'http://localhost:7081/api/books';

// Step: Create a book with title and author
When("I send POST request to create book with username {string} and password {string}", function (username, password, dataTable) {
  const bookDetails = dataTable.rowsHash();
  cy.request({
    method: 'POST',
    url: API_URL,
    auth: {
      username: username,
      password: password
    },
    body: {
      title: bookDetails.title,
      author: bookDetails.author
    },
    headers: {
      "Content-Type": "application/json"
    },
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.equal(201);
    cy.wrap(response.body.id).as('createdBookId');
  });
});

// Step: Delete the book with credentials
When("I delete the book with username {string} and password {string}", function (username, password) {
  cy.get('@createdBookId').then(bookId => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/${bookId}`,
      auth: {
        username: username,
        password: password
      },
      failOnStatusCode: false
    }).as('response');
  });
});

// Step: Verify the response status code
Then("I should get a response with status code {int}", function (statusCode) {
  cy.get('@response').its('status').should('eq', statusCode);
});

// Step: Verify the response contains a specific message
Then("response should contain message {string}", function (message) {
  cy.get('@response').its('body').should('contain', message);
});
