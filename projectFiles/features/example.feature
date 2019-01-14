Feature: This is an example Scenario

    Background: 
            #A step that will be repeated in all the scenarios in this file

#These tests wont work, pure examples

Scenario: Go to single 
        When I go to the 'home' page
        Then the 'home' page is visible


#outline is for multiple test with same steps  
    Scenario Outline: Example outline go to
            When I click on '<button>'
            Then the '<page>' is visible

        Examples: 
        | button   | page |
        | Home     | home |
        | next     | next |
