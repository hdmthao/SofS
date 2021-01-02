const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res) => {
  res.status(err.status || 500);
  logger.error(err);
});

models.sequelize.sync({});

module.exports = app;
