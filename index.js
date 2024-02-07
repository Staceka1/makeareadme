import fs from 'fs';
import inquirer from 'inquirer';

// Function to prompt the user for information
function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the project title:',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a project description:',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter installation instructions:',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter usage information:',
        },
        {
            type: 'list',
            name: 'license',
            choices: [
                'No License used.',
                'MIT License',
                'Apache License 2.0',
                'Mozilla Public License 2.0',
                'GNU GPLv3',
            ],
        },
        {
            type: 'input',
            name: 'contributors',
            message: 'Enter contributors (comma-separated):',
        },
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'gitHub',
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
        },
    ]);
}

// Function to generate the license badge
function generateLicenseBadge(license) {
    switch (license) {
        case 'MIT License':
            return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        case 'Apache License 2.0':
            return '[![License: Apache License 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        case 'Mozilla Public License 2.0':
            return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
        case 'GNU GPLv3':
            return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        default:
            return ''; // No license or 'No License used.'
    }
}

// Function to generate the README content
function generateREADME(answers) {
    const licenseBadge = generateLicenseBadge(answers.license);

    return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenseBadge}
This project is licensed under the ${answers.license} license.

## Contributors
${answers.contributors}

## Questions
GitHub profile link: [https://www.github.com/${answers.gitHub}](https://www.github.com/${answers.gitHub})

Email: ${answers.email}
`;
}

// Main function
async function main() {
    try {
        const answers = await promptUser();
        const readmeContent = generateREADME(answers);

        fs.writeFileSync('README.md', readmeContent);

        console.log('README.md successfully created!');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the main function to start the process
main();
