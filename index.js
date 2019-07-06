#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

// const github       = require('./lib/github');
const inquirer = require("./lib/inquirer");
const repo = require("./lib/repo");
const files = require("./lib/files");

const BOILERLPATE_URL = "https://github.com/vidalCreates/rdvue-boilerplate.git";

clear();
console.log(
  chalk.yellow(figlet.textSync("rdvue", { horizontalLayout: "full" }))
);

const run = async () => {
  try {
    // Prompt for project details
    const answers = await inquirer.askProjectDetails();

    const projectName = answers.name;
    const description = answers.description;

    // directory with specified name already exists
    if (files.directoryExists(projectName)) {
      console.log(chalk.red(`Project with name ${projectName} already exists`));
      process.exit();
    }

    // clone remote repository (boilerplate code)
    await repo.cloneRemoteRepo(BOILERLPATE_URL, projectName);

    const done = await files.readWriteProjectAsync(
      projectName,
      "<PROJECT_NAME>"
    );
    if (done) {
      console.log(chalk.green("All done!"));
    }
  } catch (err) {
    if (err) {
      switch (err.code) {
        //   case 401:
        //     console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
        //     break;
        //   case 422:
        //     console.log(chalk.red('There already exists a remote repository with the same name'));
        //     break;
        default:
          console.log(chalk.red(`${err}`));
      }
    }
  }
};

run();
