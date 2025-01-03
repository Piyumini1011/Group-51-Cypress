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

When("I send POST request to create book with username {string} and password {string}", function(username, password, dataTable) {
  const bookData = dataTable.hashes()[0];
  
  // Add timestamp to make book data unique
  const timestamp = new Date().getTime();
  bookData.title = `${bookData.title}_${timestamp}`;
  bookData.author = `${bookData.author}_${timestamp}`;
  
  cy.request({
      method: 'POST',
      url: API_URL,
      headers: {
          "Content-Type": "application/json",
      },
      auth: {
          username: username,
          password: password
      },
      body: bookData,
      failOnStatusCode: false
  }).as('response');
     
  cy.get('@response').its('body').its('id').as('bookId');
  cy.wrap({
      username: username,
      password: password
  }).as('loginCredentials');
});

When("I update the book with username {string} and password {string}", function(username, password, dataTable) {
  const updateData = dataTable.hashes()[0];
  
  // Add timestamp to make book data unique
  const timestamp = new Date().getTime();
  updateData.title = `${updateData.title}_${timestamp}`;
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

When("I delete the book with username {string} and password {string}", function(username, password) {
  
  cy.get('@bookId').then(bookId => {
      cy.request({
          method: 'DELETE',
          url: `${API_URL}/${bookId}`,
          headers: {
              "Content-Type": "application/json",
          },
          auth: {
              username: username,
              password: password
          },
          failOnStatusCode: false
      }).as('response');
  });
});
