Feature: Exercise Tracker

    @Positive @Register @CreateNewUser
    Scenario: Create new exercise tracker user
        When user input new username in Create a New User form
        Then user got their username and user id information

    @Positive @AddNewData
    Scenario: User add new exercise
        When user input exercise details on Add exercise form
        Then user got their saved exercise details

    @Positive @Logs @AllLogs
    Scenario: User see all their exercises logs
        When user goes to logs endpoint
        Then user got their all exercises logs in details

    @Positive @Logs @LimitLogs
    Scenario: User see filtered exercises logs with limited count data
        When user goes to logs endpoint with filter limit "2"
        Then user got their all exercises logs in details