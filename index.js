const inquirer = require('inquirer');

const fs = require('fs');

const generateMarkdown = require('./utils/generateMarkdown.js');

const licenseLink = {
    'None': 'No License',
    'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    'BSD 3-Clause': '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)', 
    'BSD 2-Clause': '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)', 
    'GNU GPL': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)', 
    'GNU LGPL': '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)', 
    'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    'ISC': '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)',
}

// array of questions for user
const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter your project title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter the project description (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter the project description!');
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Provide installation instructions.',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide usage information.',
        },
        {
            type: 'confirm',
            name: 'confirmContributing',
            message: 'Do you want other Developers to be able to work on the project?',
            default: true
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Provide Conbributor Governance.',
            when: ({ confirmContributing }) => confirmContributing
        },
        {
            type: 'input',
            name: 'test',
            message: 'Provide test instructions.',
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Who worked on the project? (Required)',
            validate: creditsInput => {
                if (creditsInput) {
                    return true;
                } else {
                    console.log('Please enter who worked on the project!');
                }
            }
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'Please choose a license from the list.',
            choices: Object.keys(licenseLink),
        },
        {
            type: 'input',
            name: 'username',
            message: 'Enter your GitHub Username (Required)',
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address (Required)',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter your email address!');
                }
            }
        },
    ];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            throw err;
        }
    });
};

// function to initialize program
function init() {
    inquirer.prompt(questions).then(answers => {
        const badgeList = answers.license.map(item => {
            return (licenseLink[item])
        });
        answers.badgeList = badgeList.join(' ');
        const response = generateMarkdown(answers);
        console.log(answers);
        writeToFile("README.md", response);
    });
};

// function call to initialize program
init();
