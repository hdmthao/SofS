import { ApplicationError } from './errors/baseError';

export const responseSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).send({
    success: true,
    ...data
  });
};

export const responseError = (res, err) => {
  let statusCode;
  if (err instanceof ApplicationError) {
    statusCode = err.statusCode;
  } else {
    statusCode = 500;
  }
  return res.status(statusCode).send({
    success: false,
    error: {
      code: err.code,
      message: err.message
    }
  });
};
