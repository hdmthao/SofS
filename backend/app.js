const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const models = require('./models');

let logger = console;
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  logger = require('./config/winston').logger;
}

const routes = require('./routes').default;

const app = express();

app.use(bodyParser.urlencoded({
  limit: '30mb',
  extended: true
}));

app.use(bodyParser.json({
  limit: '30mb',
  extended: true
}));

app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));

routes(app);

const buildPath = path.join(__dirname, '../frontend', 'build');
app.use(express.static(buildPath));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
);

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res) => {
  res.status(err.status || 500);
  logger.error(err);
});

models.sequelize.sync({});

module.exports = app;
