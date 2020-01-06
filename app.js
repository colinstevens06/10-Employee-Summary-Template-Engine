const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const cards = require("./templates/Cards");

let employeeID = 1;
let employeeList = [];

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
         let managerEmail = response.managerEmail;
         let managerOffice = response.managerOffice;
         let manager = new Manager(
            managerName,
            employeeID,
            managerEmail,
            managerOffice
         );

         console.log(manager.createCard());
         employeeID++;

         employeeList.push(manager);

         console.log(`
         ~~~~~~~~~~~~~~

         Now we'll collect information from you about your employees

         ~~~~~~~~~~~~~~
         `);

         employeePrompts();
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
            message: "What is the employee's name?",
            name: "employeeName"
         },
         {
            type: "input",
            message: "What is the employee's email address?",
            name: "employeeEmail"
         }
      ])
      .then(function(response) {
         let employeeType = response.employeeType;
         let employeeName = response.employeeName;
         let employeeEmail = response.employeeEmail;

         if (employeeType === "Engineer") {
            inquirer
               .prompt([
                  {
                     type: "input",
                     message: "What is your employee's GitHub username?",
                     name: "gitHubUN"
                  },
                  {
                     type: "list",
                     message: "Do you have more employees you'd like to add?",
                     choices: ["Yes", "No"],
                     name: "moreEmployees"
                  }
               ])
               .then(function(response) {
                  let employeeGitHub = response.gitHubUN;

                  let engineer = new Engineer(
                     employeeName,
                     employeeID,
                     employeeEmail,
                     employeeGitHub
                  );

                  employeeList.push(engineer);
                  employeeID++;

                  if (response.moreEmployees === "Yes") {
                     employeePrompts();
                  } else {
                     return;
                  }
               });
         } else {
            inquirer
               .prompt([
                  {
                     type: "input",
                     message: "Where does the intern go to school?",
                     name: "internSchool"
                  },
                  {
                     type: "list",
                     message: "Do you have more employees you'd like to add?",
                     choices: ["Yes", "No"],
                     name: "moreEmployees"
                  }
               ])
               .then(function(response) {
                  let employeeSchool = response.internSchool;

                  let intern = new Intern(
                     employeeName,
                     employeeID,
                     employeeEmail,
                     employeeSchool
                  );
                  employeeList.push(intern);
                  employeeID++;

                  if (response.moreEmployees === "Yes") {
                     employeePrompts();
                  } else {
                     return;
                  }
               });
         }
      });
   console.log(employeeList);
}

managerPrompts();
