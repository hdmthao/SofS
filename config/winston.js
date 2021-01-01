const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');

const enumerateErrorFormat = format(info => {
  if (info.message instanceof Error) {
    info.message = {
      message: info.message.message,
      stack: info.message.stack,
      ...info.message
    };
  }

  if (info instanceof Error) {
    return {
      message: info.message,
      stack: info.stack,
      ...info
    };
  }

  return info;
});

// define the custom settings for each transport (file, console)
const options = {
  info: {
    level: 'info',
    filename: `${appRoot}/logs/app.info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  debug: {
    level: 'debug',
    filename: `${appRoot}/logs/app.debug.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  error: {
    level: 'error',
    filename: `${appRoot}/logs/app.error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }
};

// eslint-disable-next-line new-cap
const logger = createLogger({
  format: format.combine(
    enumerateErrorFormat(),
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File(options.info),
    new transports.Console(options.debug),
    new transports.File(options.error)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

module.exports = {
  logger, 
};
