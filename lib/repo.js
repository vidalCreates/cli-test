const _ = require("lodash");
const fs = require("fs");
const git = require("simple-git")();
const CLI = require("clui");
const Spinner = CLI.Spinner;
const touch = require("touch");

const inquirer = require("./inquirer");
const gh = require("./github");

module.exports = {
  cloneRemoteRepo: async (url, projectName) => {
    const status = new Spinner("Copying boilerplate files from remote...");
    status.start();

    try {
      await git.clone(url, projectName);
      return true;
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  }
};
