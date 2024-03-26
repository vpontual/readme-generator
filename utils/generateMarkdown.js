// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  const badges = {
    MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    "Apache 2.0":
      "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    "GPL 3.0":
      "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    "BSD 3-Clause":
      "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
    None: "",
  };
  return badges[license];
}
// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const licenseLinks = {
    MIT: "https://opensource.org/licenses/MIT",
    "Apache 2.0": "https://opensource.org/licenses/Apache-2.0",
    "GPL 3.0": "https://www.gnu.org/licenses/gpl-3.0",
    "BSD 3-Clause": "https://opensource.org/licenses/BSD-3-Clause",
    None: "",
  };

  return licenseLinks[license];
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  const licenseText = {
    MIT: "This project is licensed under the MIT License.",
    "Apache 2.0": "This project is licensed under the Apache 2.0 License.",
    "GPL 3.0":
      "This project is licensed under the GNU General Public License v3.0.",
    "BSD 3-Clause": "This project is licensed under the BSD 3-Clause License.",
    None: "This project is not licensed.",
  };

  return licenseText[license];
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const {
    title,
    description,
    installation,
    usage,
    screenshots,
    live,
    credits,
    license,
    github,
    email,
  } = data;
  return `
  
  # ${title}

  ${renderLicenseBadge(license)}

  ## Description
  
  ${description}
  
  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
  - [Live Link](#live)
  - [Credits](#credits)
  - [License](#license)
  - [Questions](#questions)
  
  ## Installation

  ${installation}

  ## Usage

  ${usage}

  ## Screenshots

  ${screenshots}

  ## Live Link

  ${live}

  ## Credits

  ${credits}

  ## License

  ${renderLicenseSection(license)}

  ${license !== "None" ? `[License Link](${renderLicenseLink(license)})` : ""}

  ## Questions

  For any additional questions, feel free to reach out to me at ${email}. You can also check out my GitHub profile: [${github}](https://github.com/${github})
  `;
}

module.exports = generateMarkdown;
