// Including needed packages for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");

// Function to ensure the user does not leave an invalid (blank or too short) entry on required fields
function validateLength(input) {
  if (input.length < 2) {
    return "Input must be at least 3 characters long.";
  }
  return true;
}

// Function to ensure the user inputs an email in the proper format
function validateEmail(input) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(input)) {
    return true;
  } else {
    return "Please enter a valid email address.";
  }
}

// Array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of this project?",
    validate: validateLength,
  },
  {
    type: "input",
    name: "description",
    message: "Please describe this project:",
    validate: validateLength,
  },
  {
    type: "input",
    name: "installation",
    message: "Provide installation instructions for your project:",
    validate: validateLength,
  },
  {
    type: "input",
    name: "usage",
    message: "Provide usage information for your project:",
    validate: validateLength,
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
      validate: validateLength,
    },
  },
  {
    confirm: {
      type: "confirm",
      name: "askAboutVideo",
      message:
        "Would you like to provide a link to a video walkthrough of the application?",
      default: false,
    },
    question: {
      type: "input",
      name: "video",
      message: "Please enter the link for the video:",
      validate: validateLength,
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
      validate: validateLength,
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
      validate: validateLength,
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
      validate: validateLength,
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
    validate: validateLength,
  },
  {
    type: "input",
    name: "email",
    message: "Enter your contact email address:",
    validate: validateEmail,
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
    if (item.confirm) {
      const confirm = await inquirer.prompt(item.confirm);
      if (confirm[item.confirm.name]) {
        const answer = await inquirer.prompt(item.question);
        results = { ...results, ...answer };
      }
    } else {
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
    writeToFile("README.md", markdown);
  });
}

// Function call to initialize app
init();
