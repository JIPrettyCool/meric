#!/usr/bin/env node
"use strict";

// Clear Terminal
process.stdout.write("\u001b[3J\u001b[2J\u001b[1J\u001b[3J");
console.clear();

const config          =   require("./meric.json");

const terminalImage   =   require('terminal-image');
const chalk           =   require('chalk');
const got             =   require('got');
const ww              =   require('word-wrap');

const inquirer        =   require('inquirer');
const open            =   require('open');

function openSocialSelector() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Socials...',
      name: 'link',
      choices: [
        { name: chalk.bold.hex('#888888')(`💻  GitHub`), value: 'https://github.com/jiprettycool' },
        { name: chalk.bold.hex('#1DA1F2')(`🐦  Twitter`), value: 'https://twitter.com/iamrealji' },
        { name: chalk.bold.hex('#25D366')(`💬  Discord`), value: 'https://discord.gg/ZQSHn9b' },
        { name: chalk.bold.hex('#D7CBFD')(`🏠  My Trash Website`), value: 'https://meric.vercel.app' },
        { name: chalk.bold.hex('#f04a45')('👋  Nope. Bye.'), value: false }
      ]
    }
  ])
  .then((result) => {
    if (result.link) {
      open(result.link);
      openSocialSelector();
    } else {
      process.exit();
    }
  })
  .catch(() => {});
}

console.log("")
got(config.avatar, { responseType: 'buffer' })
  .then((image) => terminalImage.buffer(image.body, { width: '26%' }))
  .then((image) => image.split("\n").forEach((line) => console.log("  " + line)))
  .then(() => {
    console.log(ww(eval(`chalk\`${config.title}\``), { width: 200, trim: true }))
    // config.about.forEach(text => console.log(ww(eval(`chalk\`${text}\``), { width: 200, trim: true })))
  })
  .then(() => {
    console.log("\n")
    openSocialSelector();
  })
  .catch((e) => console.log(e));
