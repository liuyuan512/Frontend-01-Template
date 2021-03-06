const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  async prompting() {
    this.dependency = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Would you like to enable the cool frature?"
      }
    ]);
  }
  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: "^3.15.0"
      },
      dependencies: {
        [this.dependency.name]: "*"
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }

  install() {
    this.npmInstall();
  }
};
