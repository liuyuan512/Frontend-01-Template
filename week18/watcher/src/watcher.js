const fsevents = require("fsevents");
// const webpack = require("webpack");
// const httpServer = require("http-server");

const { exec } = require("child_process");

// exec("http-server");
// exec("webpack", webpack);

// console.log("fsevents:", fsevents);
const stop = fsevents.watch(__dirname, (path, flags, id) => {
  // console.log("webpack----", __dirname);
  const info = fsevents.getInfo(path, flags, id);
  console.log(info);
  exec("webpack");
});

// stop();
