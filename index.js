// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");
// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of this project?",
  },
  {
    type: "input",
    name: "description",
    message: "Please describe this project:",
  },
  {
    type: "input",
    name: "installation",
    message: "Provide installation instructions for your project:",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide usage information for your project:",
  },
  {
    confirm: {
      type: "confirm",
      name: "askAboutScreenshot",
      message:
        "Would you like to provide a link to a screenshot of the application?",
      default: false,
    },
    question: {
      type: "input",
      name: "screenshots",
      message: "Please enter the link for the screenshot:",
    },
  },
  {
    confirm: {
      type: "confirm",
      name: "askAboutLive",
      message:
        "Would you like to provide a link to the live website of the application?",
      default: false,
    },
    question: {
      type: "input",
      name: "live",
      message: "Please enter the link for the website:",
    },
  },
  {
    confirm: {
      type: "confirm",
      name: "askAboutCredits",
      message: "Did you work with any collaborators on this project?",
      default: false,
    },
    question: {
      type: "input",
      name: "credits",
      message: "Please list them:",
    },
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license for your project:",
    choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3-Clause", "None"],
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter your contact email address:",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log("README generated successfully!")
  );
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    const markdown = generateMarkdown(answers);
    writeToFile("README.md", markdown);
  });
}

// Function call to initialize app
init();
