// Including needed packages for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");

// Array of questions for user input
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
    confirm: {
      type: "confirm",
      name: "askAboutTests",
      message:
        "Are there any specific tests to ensure the code is working properly?",
      default: false,
    },
    question: {
      type: "input",
      name: "tests",
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

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log("README generated successfully!")
  );
}

// Function to add the logic to the optional questions
async function askQuestions(questions) {
  let results = {};

  for (const item of questions) {
    // Determine if the question is option by verifying if it has 'confirm' property
    if (item.confirm) {
      // It is an optional question, first ask the confirm question
      const confirm = await inquirer.prompt(item.confirm);
      // If confirmed, then ask the actual question
      if (confirm[item.confirm.name]) {
        const answer = await inquirer.prompt(item.question);
        results = { ...results, ...answer };
      }
    } else {
      // The question is not optional, ask it directly
      const answer = await inquirer.prompt(item);
      results = { ...results, ...answer };
    }
  }

  return results;
}

// Function to initialize app
function init() {
  askQuestions(questions).then((answers) => {
    const markdown = generateMarkdown(answers);
    //console.log(answers);
    writeToFile("README.md", markdown);
  });
}

// Function call to initialize app
init();
