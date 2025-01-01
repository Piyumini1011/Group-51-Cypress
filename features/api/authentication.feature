@api
Feature: Authentication API Tests

  Scenario: Successfully access API with admin credentials
    When I request the list of books with username "admin" and password "password"
    Then I should get a response with status code 200
    And the response should contain a list of books where each book has "id", "title", and "author"

  Scenario: Successfully access API with user credentials
    When I request the list of books with username "user" and password "password"
    Then I should get a response with status code 200
    And the response should contain a list of books where each book has "id", "title", and "author"
