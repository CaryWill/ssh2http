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
  const url = await wrappedExec("git config --get remote.origin.url");
  let ssh;
  let http;
  if (url.startsWith("git")) {
    ssh = url;
    const [, , host, group, repo] = url.match(/(^git)@(.+):(.+)[/](.+)/);
    http = `https://${host}/${group}/${repo}`;
  } else {
    http = url;
    const [, , host, group, repo] = url.match(
      /(^https:[/][/])(.+)[/](.+)[/](.+)/
    );
    ssh = `git@${host}:${group}/${repo}`;
  }
  const [, , flag] = arguments;
  await wrappedExec(`git remote set-url origin ${flag === "-s" ? ssh : http}`);
};

main();
