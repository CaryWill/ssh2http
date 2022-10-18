#!/usr/bin/env node

const { exec } = require("node:child_process");
const arguments = process.argv;

const wrappedExec = (commands, options) => {
  return new Promise((res, rej) => {
    exec(commands, options, (error, stdout) => {
      if (error) {
        rej(error);
      } else {
        res(stdout);
      }
    });
  });
};

const main = async () => {
  const email = "git config --get remote.origin";
  const res = await wrappedExec(email);
  console.log(res, arguments, "test");
};

main();
