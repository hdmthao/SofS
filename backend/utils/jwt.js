/* eslint-disable quotes */
const jwt = require('jsonwebtoken');

const algorithm = 'HS256';
const expiresIn = '30d';
const secret = `HKT SofS 2018 HDMT`;

export const tokenGenerator = async (object) => {
  try {
    // logger.debug('tokenGenerator: object = {}', object);
    return jwt.sign(
      object,
      secret,
      {
        algorithm,
        expiresIn
      },
    );
  } catch (err) {
    // logger.debug('tokenGenerator error: object = {}, err = {}', object, err);
    return null;
  }
};

export const tokenVerify = async (token) => {
  try {
    return await jwt.verify(token, secret, { algorithm }, (err, decoded) => ({
      err,
      decoded
    }));
  } catch (err) {
    // logger.debug('tokenVerify error: {}', err);
    return null;
  }
};

export const verifyUser = (req, res, next) => {
  const {authorization} = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, secret, { algorithm }, (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          error: {
            message: 'Invalid Token'
          }
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      success: false,
      error: {
        message: 'No Token'
      }
    });
  }
}

export const verifyAdmin = (req, res, next) => {
  if (req.user.userType === 'admin') {
    return next();
  }
  return res.status(401).send({
    success: false,
    error: {
      message: 'Invalid admin token'
    }
  });
};

export const verifySeller = (req, res, next) => {
  if (req.user.userType === 'seller') {
    return next();
  }
  return res.status(401).send({
    success: false,
    error: {
      message: 'Invalid seller token'
    }
  });
}