import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.
  }
}