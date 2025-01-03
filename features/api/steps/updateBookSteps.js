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

When("I update book with data missing field with username {string} and password {string}", function(username, password, dataTable) {
  const updateData = {};
  const row = dataTable.hashes()[0];
  
  // Add timestamp to make data unique
  const timestamp = new Date().getTime();
  updateData[row.field] = `${row.value}_${timestamp}`;
  
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

When("I update book with invalid input with username {string} and password {string}", function(username, password, dataTable) {
  const row = dataTable.hashes()[0];
  const updateData = {};
  
  // Handle special case for blank values
  const value = row.value === '{blank}' ? '' : row.value;
  
  // Add timestamp to make data unique if the value is not blank
  const timestamp = new Date().getTime();
  updateData[row.field] = value ? `${value}_${timestamp}` : value;
  
  // Add the other field with valid data to ensure we're only testing one invalid field at a time
  if (row.field === 'title') {
      updateData.author = `Valid Author ${timestamp}`;
  } else {
      updateData.title = `Valid Title ${timestamp}`;
  }
  
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