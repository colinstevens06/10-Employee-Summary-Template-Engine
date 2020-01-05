const fs = require("fs");
const inquirer = require("inquirer");

function managerPrompts() {
   inquirer
      .prompt([
         {
            type: "input",
            message: "Manager name: ",
            name: "managerName"
         },
         {
            type: "input",
            message: "What is your employee ID?",
            name: "managerID"
         },
         {
            type: "input",
            message: "What is your email address?",
            name: "managerEmail"
         },
         {
            type: "input",
            message: "What is your office number?",
            name: "managerOffice"
         }
      ])
      .then(function(response) {
         let managerName = response.managerName;
         let managerID = response.managerID;
         let managerEmail = response.managerEmail;
         let managerOffice = response.managerOffice;

         console.log(managerName);
      });
}

function employeePrompts() {
   inquirer
      .prompt([
         {
            type: "list",
            message: "What is the employee's role?",
            choices: ["Engineer", "Intern"],
            name: "employeeType"
         },
         {
            type: "input",
            message: "What is the employee's ID number?",
            name: "employeeID"
         },
         {
            type: "input",
            message: "What is the employee's email address?",
            name: "employeeEmail"
         }
      ])
      .then(function(response) {
         let employeeType = response.employeeType;
         let employeeID = response.employeeID;
         let employeeEmail = response.employeeEmail;

         if (employeeType === "Engineer") {
            inquirer.prompt([
               {
                  type: "input",
                  message: "What is your employee's GitHub username?",
                  name: "gitHubUN"
               }
            ]);
         } else {
            inquirer.prompt([
               {
                  type: "input",
                  message: "Where does the intern go to school?",
                  name: "internSchool"
               }
            ]);
         }
      });
}

// need to ask the manager for their information first
// then ask for information about the first employee
// then ask 'do you want to enter another employee?
// if yes, you run the promps again - so I want to put the employee questions and conditionals in a function that I can call
