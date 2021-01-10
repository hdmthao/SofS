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
