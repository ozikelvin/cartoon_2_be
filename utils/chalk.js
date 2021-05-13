const chalk = require("chalk");

 function Logger(text, color = 'yellow') {
    const obj = {
        yellow: chalk.yellow.bold,
        red: chalk.red.bold,
        green: chalk.green.bold,
    };

    console.log(Object(obj)[color](text));

    return true;
}
module.exports = {Logger}