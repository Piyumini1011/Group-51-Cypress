Feature: Retrieve a specific book by ID

  Scenario: Successfully retrieve a specific book using a valid ID
    Given I have valid admin credentials with username "admin" and password "password"
    When I create a book with title "Test Book Title" and author "Test Book Author"
    And I request to retrieve the created book
    Then I should get a response with status code 200
    And the response should contain the book with "id", "title", and "author"

  Scenario: Attempt to retrieve a specific book using an invalid ID
    Given I have valid admin credentials with username "admin" and password "password"
    When I request to retrieve the book with ID "-5"
    Then I should get a response with status code 404
    And response should contain message "Book not found"

  Scenario: Attempt to retrieve a non-existent book by ID
    Given I have valid admin credentials with username "admin" and password "password"
    When I request to retrieve the book with ID "999"
    Then I should get a response with status code 404
    And response should contain message "Book not found"
