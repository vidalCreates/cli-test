const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const CLI = require("clui");
const Spinner = CLI.Spinner;

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: filePath => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  readWriteProjectAsync: (projectName, templateVariable) => {
    const status = new Spinner("updating template files from boilerplate...");
    status.start();
    try {
      const filelist = _.without(
        fs.readdirSync(`./${projectName}/`),
        ".git",
        ".gitignore"
      );

      return filelist.forEach(filename => {
        const filePath = `./${projectName}/${filename}`;
        // this.readWriteFileAsync(
        //   `./${projectName}/${filename}`,
        //   templateVariable,
        //   projectName
        // );
        return fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) throw err;

          r = new RegExp(templateVariable, "g");
          console.log(r);
          var newValue = data.replace(r, projectName);

          fs.writeFile(filePath, newValue, "utf-8", err => {
            if (err) throw err;
            console.log(`updating ${filePath}`);
          });
        });
      });
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  }
};
