const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const API_URL = 'http://localhost:7081/api/books';
// Only keep the book-specific verification step
Then("the book should be updated with new title and author", function() {
    cy.get('@response').then(response => {
        cy.get('@bookId').then(bookId => {
            cy.request({
                method: 'GET',
                url: `${Cypress.env('API_URL')}/api/books/${bookId}`,
                headers: {
                    "Content-Type": "application/json",
                },
                auth: {
                    username: 'admin',
                    password: 'password'
                }
            }).then(getResponse => {
                expect(getResponse.body.title).to.include('Updated Test Book');
                expect(getResponse.body.author).to.include('Updated Author');
            });
        });
    });
});

When("I update the book with missing author field with username {string} and password {string}", function(username, password, dataTable) {
  const updateData = dataTable.hashes()[0];
  
  // Add timestamp to make book data unique
  const timestamp = new Date().getTime();
  updateData.title = `${updateData.title}_${timestamp}`;
  
  cy.get('@bookId').then(bookId => {
      // Add the book ID to the update data
      updateData.id = bookId;
      
      cy.request({
          method: 'PUT',
          url: `${API_URL}/${bookId}`,
          headers: {
              "Content-Type": "application/json",
          },
          auth: {
              username: username,
              password: password
          },
          body: updateData,
          failOnStatusCode: false
      }).as('response');
  });
});

When("I update the book with missing title field with username {string} and password {string}", function(username, password, dataTable) {
  const updateData = dataTable.hashes()[0];
  
  // Add timestamp to make author data unique
  const timestamp = new Date().getTime();
  updateData.author = `${updateData.author}_${timestamp}`;
  
  cy.get('@bookId').then(bookId => {
      // Add the book ID to the update data
      updateData.id = bookId;
      
      cy.request({
          method: 'PUT',
          url: `${API_URL}/${bookId}`,
          headers: {
              "Content-Type": "application/json",
          },
          auth: {
              username: username,
              password: password
          },
          body: updateData,
          failOnStatusCode: false
      }).as('response');
  });
});

When("I update the book with empty body with username {string} and password {string}", function(username, password) {
  cy.get('@bookId').then(bookId => {
      cy.request({
          method: 'PUT',
          url: `${API_URL}/${bookId}`,
          headers: {
              "Content-Type": "application/json",
          },
          auth: {
              username: username,
              password: password
          },
          body: {},  // Empty body
          failOnStatusCode: false
      }).as('response');
  });
});