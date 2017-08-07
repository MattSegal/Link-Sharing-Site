Feature: showing off behave

    @browser
    Scenario: existing user logs in
        Given I visit the login page
        when I fill and submit the login form
        then I am on to the home page
        then I am logged in

    @wip
    @browser
    Scenario: user interacts with the sidebar
        Given I visit the home page
        then the sidebar is off screen
        when I click the sidebar open icon
        then the sidebar is on screen
        when I click the sidebar close icon
        then the sidebar is off screen
