const inquirer = require('inquirer');

const fs = require('fs');

const generateMarkdown = require('./utils/generateMarkdown.js');

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
            type: 'input',
            name: 'contribution',
            message: 'Enter the project contributors (Required)',
            validate: contributionInput => {
                if (contributionInput) {
                    return true;
                } else {
                    console.log('Please enter the project contributors!');
                }
            }
        },
        {
            type: 'input',
            name: 'test',
            message: 'Provide test instructions.',
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'Please choose a license from the list.',
            choices: ['Apache 2.0', 'BSD 3-Clause', 'BSD 2-Clause', 'GNU GPL', 'GNU LGPL', 'MIT']
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
        const response = generateMarkdown(answers);
        console.log(answers);
        writeToFile("README.md", response);
    });
};

// function call to initialize program
init();
