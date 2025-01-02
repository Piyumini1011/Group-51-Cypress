const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const API_URL = 'http://localhost:7081/api/books';

Given("I have valid admin credentials with username {string} and password {string}", function (username, password) {
  cy.wrap({ username, password }).as('adminCredentials');
});

When("I create a book with title {string} and author {string}", function (title, author) {
  cy.get('@adminCredentials').then(credentials => {
    cy.request({
      method: 'POST',
      url: API_URL,
      auth: {
        username: credentials.username,
        password: credentials.password
      },
      body: {
        title: title,
        author: author
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      expect(response.status).to.equal(201);
      cy.wrap(response.body.id).as('createdBookId');
    });
  });
});

When("I request to retrieve the created book", function () {
  cy.get('@adminCredentials').then(credentials => {
    cy.get('@createdBookId').then(bookId => {
      cy.request({
        method: 'GET',
        url: `${API_URL}/${bookId}`,
        auth: {
          username: credentials.username,
          password: credentials.password
        },
        failOnStatusCode: false
      }).as('response');
    });
  });
});

When("I request to retrieve the book with ID {string}", function (bookId) {
  cy.get('@adminCredentials').then(credentials => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/${bookId}`,
      auth: {
        username: credentials.username,
        password: credentials.password
      },
      failOnStatusCode: false
    }).as('response');
  });
});

Then("the response should contain the book with {string}, {string}, and {string}", function (idKey, titleKey, authorKey) {
  cy.get('@response').then(response => {
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.all.keys(idKey, titleKey, authorKey);
  });
});
