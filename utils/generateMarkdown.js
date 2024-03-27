// Function that returns a license badge based on which license is passed in. If there is no license, returns an empty string.
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

// Function that returns the license link. If there is no license, return an empty string.
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

// Function that returns the license section of README. If there is no license, return an empty string.
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

// Function to generate markdown for README
function generateMarkdown(data) {
  const {
    title,
    description,
    installation,
    usage,
    screenshots,
    video,
    live,
    credits,
    tests,
    license,
    github,
    email,
  } = data;

  let sections = [];

  sections.push(`# ${title}\n\n`);
  sections.push(`${renderLicenseBadge(license)}\n\n`);
  sections.push(`## Description\n\n${description}\n\n`);

  sections.push(`## Table of Contents\n\n`);
  sections.push(`- [Installation](#installation)\n`);
  sections.push(`- [Usage](#usage)\n`);
  if (screenshots) sections.push(`- [Screenshots](#screenshots)\n`);
  if (video) sections.push(`- [Video](#video)\n`);
  if (live) sections.push(`- [Live Link](#live)\n`);
  if (credits) sections.push(`- [Credits](#credits)\n`);
  if (tests) sections.push(`- [Tests](#tests)\n`);
  sections.push(`- [License](#license)\n`);
  sections.push(`- [Questions](#questions)\n`);
  sections.push("\n");

  if (installation) {
    sections.push(`## Installation\n${installation}\n\n`);
  }
  if (usage) {
    sections.push(`## Usage\n${usage}\n\n`);
  }
  if (screenshots) {
    sections.push(`## Screenshots\n${screenshots}\n\n`);
  }
  if (video) {
    sections.push(`## Video\n${video}\n\n`);
  }
  if (live) {
    sections.push(`## Live Link\n${live}\n\n`);
  }
  if (credits) {
    sections.push(`## Credits\n${credits}\n\n`);
  }
  if (tests) {
    sections.push(`## Tests\n${tests}\n\n`);
  }
  if (license) {
    license === "None"
      ? sections.push(`## License\n${renderLicenseSection(license)}\n\n`)
      : sections.push(
          `## License\n[${renderLicenseSection(license)}](${renderLicenseLink(
            license
          )})\n\n`
        );
  }
  if (github || email) {
    sections.push(
      `## Questions\nFor any additional questions, feel free to reach out to me at ${email}. You can also check out my GitHub profile: [${github}](https://github.com/${github})`
    );
  }

  return sections.join("");
}

module.exports = generateMarkdown;
