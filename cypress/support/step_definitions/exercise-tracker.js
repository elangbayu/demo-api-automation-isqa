import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from '@faker-js/faker';
import Ajv from "ajv";
const ajv = new Ajv();

let User = {
    username: "",
    _id: ""
}

let Exercise = {
    _id: "",
    description: "",
    duration: "",
    date: ""
}

let Logs = {}

const logsSchema = {
    "type": "object",
    "properties": {
      "_id": {
        "type": "string"
      },
      "username": {
        "type": "string"
      },
      "count": {
        "type": "integer"
      },
      "log": {
        "type": "array",
        "items": [
          {
            "type": "object",
            "properties": {
              "description": {
                "type": "string"
              },
              "duration": {
                "type": "integer"
              },
              "date": {
                "type": "string"
              }
            }
          }
        ]
      }
    }
  }

const validateLog = ajv.compile(logsSchema);

const username = faker.internet.userName();
const description = faker.lorem.word(10);
const duration = faker.random.numeric(2);

When("user input new username in Create a New User form", () => {
    cy.request({
        url: "api/users",
        method: "POST",
        form: true,
        body: {
            username: username
        },
        failOnStatusCode: true
    }).then((res) => {
        // Save response to global User object
        User.username = res.body.username;
        User._id = res.body._id;
    });
});

Then("user got their username and user id information", () => {
    assert.equal(User.username, username);
    assert.notEqual(User._id, "");
});


When("user input exercise details on Add exercise form", () => {
    cy.request({
        url: `api/users/${User._id}/exercises`,
        method: "POST",
        form: true,
        body: {
            ":_id": User._id,
            description: description,
            duration: duration,
            date: ""
        },
        failOnStatusCode: true
    }).then((res) => {
        Exercise._id = res.body._id;
        Exercise.description = res.body.description;
        Exercise.duration = res.body.duration;
        Exercise.date = res.body.date;
    });
});

Then("user got their saved exercise details", () => {
    assert.equal(Exercise._id, User._id);
    assert.equal(Exercise.description, description);
    assert.equal(Exercise.duration, duration);
    assert.notEqual(Exercise.date, "");
});

When("user goes to logs endpoint", () => {
    cy.request({
        url: `api/users/${User._id}/logs`,
        method: "GET",
        failOnStatusCode: true
    }).then((res) => {
        Logs = res.body;
    });
});

Then("user got their all exercises logs in details", () => {
    const isLogsSchemaValid = validateLog(Logs);
    assert.isTrue(isLogsSchemaValid);
});

When("user goes to logs endpoint with filter {string}", (query_param) => {

});

Then("user got their all filtered {string} exercises logs in details", (query_param) => {

});