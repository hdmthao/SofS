const fs = require('fs');
const path = require('path');

const config = {};

fs
  .readdirSync(path.resolve(__dirname, 'env'))
  .forEach((file) => {
    if (file === 'config.js') return;
    const env = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'env', file), 'utf8'));

    config[file.split('.')[1]] = env.databaseConfig;
  });

module.exports = config;
