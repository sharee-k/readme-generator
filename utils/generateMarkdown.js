

// function to generate markdown for README
function generateMarkdown(data) {

  // create Contributing section if confirmed
  const generateContributing = contributingInput => {
    if (!contributingInput) {
      return 'Conntribution not allowed.';
    } else {
      return `${data.contributing}`
      ;
    };
  };
  return `
  # ${data.title}

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Test](#test)
  - [Credits](#credits)
  - [License](#license)
  - [Questions](#questions)

  ## Description
  ${data.badgeList}

  ${data.description}

  ## Installation
  ${data.installation}

  ## Usage
  ${data.usage}

  ## Contributing
  ${generateContributing(data.contributing)}

  ## Test
  ${data.test}

  ## Credits
  ${data.credits}

  ## License
  ${data.license}

  Additional licensing information can be found at  ${data.badgeList}.

  ## Questions
  For questions please contact me at the following:
  - GitHub: ${data.username}
  - Email: ${data.email}
`;
}

module.exports = generateMarkdown;
