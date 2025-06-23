import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
    type:"input",
    message:'Enter The URL:',
    name:'url',
    },
  ])
  .then((answers) => {
    const url = answers.url;
    const qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(`qr.png`));

    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('URL saved to URL.txt');
  });
})
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });