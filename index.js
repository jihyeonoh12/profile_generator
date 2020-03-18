const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");


const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username"
      },
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?"
    },
    {
        type: "list",
        name: "color",
        message: "Select one color",
        choices: ["green", "blue", "red", "pink"]
      }
  ]);
}



async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);
    var filename = answers.name.toLowerCase().split(' ').join('') + ".html";

    await writeFileAsync(filename, html);

    console.log("Successfully wrote to html file");
  } catch(err) {
    console.log(err);
  }
}

init();
