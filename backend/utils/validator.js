import { BadRequestError } from './errors/userFacingError';

const validateType = (value, type) => {
  switch (type.toLowerCase()) {
    case 'number':
      return !Number.isNaN(parseInt(value, 10));
    case 'string':
      return typeof value === 'string' || value instanceof String;
    default:
      return true;
  }
};

export default class Validator {
  static validatePayload(payload, { requires = [], options = {} }) {
    requires.forEach(f => {
      const field = Array.isArray(f) ? f[0] : f;
      if (!payload.hasOwnProperty(field)) {
        throw new BadRequestError(`${field} required`, 40);
      }
    });

    let fields = requires.concat(options);
    fields.forEach(field => {
      if (Array.isArray(field) && payload.hasOwnProperty(field[0])) {
        const validType = validateType(payload[field[0]], field[1]);
        if (!validType) {
          throw new BadRequestError(`${field[0]} require type ${field[1]}`, 30);
        }
      }
    });
    fields = fields.map(field => {
      return Array.isArray(field) ? field[0] : field;
    });
    return Object.keys(payload)
      .filter(key => fields.includes(key))
      .reduce((obj, key) => {
        obj[key] = payload[key];
        return obj;
      }, {});
  }

  static validateParams(params, fields) {
    fields.forEach(field => {
      if (Array.isArray(field) && params.hasOwnProperty(field[0])) {
        if (!validateType(params[field[0]], field[1])) {
          throw new BadRequestError(`${field[0]} require type ${field[1]}`);
        }
      }
    });
  }
  
  static validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
}
