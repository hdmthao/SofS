/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
const fs = require('fs');

exports.default = (app) => {
  fs
    .readdirSync(__dirname)
    .forEach((file) => {
      file = file.split('.')[0];

      if (file === 'index') return;
      // console.log(`Loading route ${file}...`);

      app.use(require(`./${file}`));
    });

  return app;
};
