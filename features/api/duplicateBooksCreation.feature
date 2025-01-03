Feature: Prevent Creation of Duplicate Books

  Scenario: System prevents creation of duplicate books
    Given I am authenticated as "admin" with password "password"
    When I create a new book with the following details:
      | title         | author      |
      | The Test Book | Test Author |
    And I attempt to create the same book again with the following details:
      | title         | author      |
      | The Test Book | Test Author |
    And the response body should contain the error message "Book Already Exists"
   
