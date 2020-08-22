const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Would you like to enable the cool frature?"
      }
    ]);
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("public/index.html"),
      { title: "aaron" }
    );
  }
  install() {
    this.npmInstall();
  }
};
