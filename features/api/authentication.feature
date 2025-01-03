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

  Scenario: Admin can successfully create a book
    When I send POST request to create book with username "admin" and password "password"
      | title          | author        |
      | Test Book One  | Test Author 1 |
    Then I should get a response with status code 201

  Scenario: User can successfully create a book
    When I send POST request to create book with username "user" and password "password"
      | title          | author        |
      | Test Book Two  | Test Author 2 |
    Then I should get a response with status code 201
  
  # Scenario: Cannot create book with invalid data
  #   When I send POST request to create book with username "admin" and password "password"
  #     | title | author |
  #     |       |        |
  #   Then I should get a response with status code 400
  #   And response should contain message "Invalid Input Parameters"

  