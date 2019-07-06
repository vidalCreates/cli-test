const inquirer = require("inquirer");
const files = require("./files");

module.exports = {
  askIgnoreFiles: filelist => {
    const questions = [
      {
        type: "checkbox",
        name: "ignore",
        message: "Select the files and/or folders you wish to ignore:",
        choices: filelist,
        default: ["node_modules", "bower_components"]
      }
    ];
    return inquirer.prompt(questions);
  },

  askProjectDetails: () => {
    const argv = require("minimist")(process.argv.slice(2));

    const questions = [
      {
        type: "input",
        name: "name",
        message: "Enter a name for the project:",
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a name for the prpject.";
          }
        }
      },
      {
        type: "input",
        name: "description",
        default: argv._[1] || null,
        message: "Optionally enter a description of the project:"
      }
    ];
    return inquirer.prompt(questions);
  }
};
