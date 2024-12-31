Feature: Library API Login

  Scenario Outline: Login with different credentials
    Given I navigate to the Library API
    When I login with username "<username>" and password "<password>"
    Then I should receive a success response

    Examples:
      | username | password  |
      | admin    | password  |
      | user     | password  |
