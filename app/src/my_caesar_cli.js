const fs = require('fs');
const { program } = require('commander');
const calculate = require('./utils/utils');
const path = require('path');
const dirPath = path.join(__dirname);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

console.log('START!');

let action;
let shift;
let input;
let output;

program
  .storeOptionsAsProperties(true)
  .option('-a, --action [action]', 'action encode/decode')
  .option('-s, --shift [shift]', 'shift')
  .option('-i, --input [input]', 'input')
  .option('-o, --output [output]', 'output')
  .parse(process.argv);

program.action
  ? (action = program.action)
  : console.log('no action specified!');
program.shift
  ? (shift = Number(program.shift))
  : console.log('no shift specified!');
program.input ? (input = program.input) : console.log('no input specified!');
program.output
  ? (output = program.output)
  : console.log('no output specified!');

try {
  if (!action)
    throw '[ERROR APP] Parameters action is critical important! Please specify and try again!';

  if (!(action == 'encode' || action == 'decode')) {
    throw '[ERROR APP] Parameters action should be encode or decode!';
  }

  if (!shift)
    throw '[ERROR APP] Parameters shift is critical important! Please specify and try again!';

  if (shift < 0) throw '[ERROR APP] Paramter shift should be >=0!';
} catch (error) {
  console.error(error);
  process.exit(1);
}

const isFileExistsOrNotCheck = (dirPath, fileName) => {
  return new Promise((resolve, reject) => {
    const file = dirPath + '/' + fileName;

    fs.access(file, fs.F_OK, err => {
      try {
        if (err) {
          reject(`[ERROR APP] file ${file} is not exists!`);
        }

        resolve('OK!');
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    });
  });
};

try {
  if (dirPath && action && shift && !input && !output) {
    rl.on('line', function(line) {
      const result = calculate(line, action, shift);
      process.stdout.write(result + '\n');
    });

    rl.on('close', function() {
      console.log('\nBYE BYE !!!');
      process.exit(0);
    });
  } else if (dirPath && action && shift && input && !output) {
    isFileExistsOrNotCheck(dirPath, input)
      .then(result => {
        writeDataFromInputToStdOut(dirPath, action, shift, input, output);
      })
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  } else if (dirPath && action && shift && !input && output) {
    isFileExistsOrNotCheck(dirPath, output)
      .then(result => {
        rl.on('line', function(line) {
          const result = calculate(line, action, shift);
          writeDataFromStdInToOutput(dirPath, action, shift, line, output);
        });
        rl.on('close', function() {
          console.log('\nBYE BYE !!!');
          process.exit(0);
        });
      })
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  } else if (dirPath && action && shift && input && output) {
    isFileExistsOrNotCheck(dirPath, input)
      .then(result => {
        isFileExistsOrNotCheck(dirPath, output)
          .then(result => {
            writeDataFromInputToOutput(dirPath, action, shift, input, output);
          })
          .catch(err => {
            console.log(err);
            process.exit(1);
          });
      })
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  } else {
    throw '[ERROR APP] Not enoguth parameters to calculation!';
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}

function writeDataFromInputToOutput(dirPath, action, shift, input, output) {
  const readStream = fs.createReadStream(dirPath + '/' + input, 'utf8');
  const writeStream = fs.createWriteStream(dirPath + '/' + output);

  readStream
    .on('data', function(chunk) {
      const result = calculate(chunk, action, shift);
      console.log('Result', result);
      writeStream.write(result);
    })
    .on('end', function() {
      console.log('FINISHED! Everythn is OK!');
      rl.close();
    });
}

function writeDataFromInputToStdOut(dirPath, action, shift, input, output) {
  const readStream = fs.createReadStream(dirPath + '/' + input, 'utf8');

  readStream
    .on('data', function(chunk) {
      const result = calculate(chunk, action, shift);
      process.stdout.write(result + '\n');
      rl.close();
    })
    .on('end', function() {
      console.log('FINISHED! Everythn is OK!');
      rl.close();
    });
}

function writeDataFromStdInToOutput(dirPath, action, shift, input, output) {
  const writeStream = fs.createWriteStream(dirPath + '/' + output);
  const result = calculate(input, action, shift);
  writeStream.write(result);
}
