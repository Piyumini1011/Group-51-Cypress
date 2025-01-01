// delete-book.feature
@api
Feature: Delete Book API Tests

  Scenario: Successfully delete a book as an admin
    Given I have valid admin credentials "admin" and "password"
    When I send a DELETE request to delete a book with ID "1"
    Then I should get a response with status code 200
    And the response should contain message "Book deleted successfully"

  Scenario: Attempt to delete a book as a user
    Given I have valid user credentials "user" and "password"
    When I send a DELETE request to delete a book with ID "1"
    Then I should get a response with status code 403
    And the response should contain message "Unauthorized access"