import { User, UserType, Seller } from '../models';
import { tokenGenerator } from '../utils/jwt';
import { ConflictError, ForbiddenError, NotFoundError } from '../utils/errors/userFacingError';
import { DatabaseError } from '../utils/errors/baseError';

const { hashPassword, isAuthenticate } = require('../utils/hash');
const { logger } = require('../config/winston');

export default class AuthService {
  static async signUp(info) {
    const hashedPassword = hashPassword(info.password);

    const emailExisted = await User.findOne({
      where: {
        email: info.email
      }
    });
    if (emailExisted) {
      throw new ConflictError('Email already exist', 'email_duplicate');
    }

    const user = await User.create({
      email: info.email,
      name: info.name,
      userTypeId: 3, // big hack. it is typeId of type Buyer
      password: hashedPassword,
      // status: true
    }).catch((err) => {
      logger.error(err);
      return null;
    });

    if (!user) {
      throw new DatabaseError('Can not create user', 'database_error');
    }
    return {
      message: 'Registration successful'
    };
  }

  static async signIn(info) {
    const user = await User.findOne({
      where: {
        email: info.email,
      },
      attributes: {
        exclude: ['createAt', 'updateAt'],
      },
      include: [{
        model: UserType,
        attributes: ['type']
      }]
    });

    if (!user || !isAuthenticate(info.password, user.password)) {
      throw new NotFoundError('Wrong email or password', 'not_found');
    }

    if (user.status === false) {
      throw new ForbiddenError('User has been banned.', 'forbidden');
    }
    let seller = null;
    if (user.UserType.type === 'seller') {
      seller = await Seller.findOne({
        where: {
          userId: user.id
        }
      });
    }
    const tokenObject = {
      id: user.id,
      userType: user.UserType.type
    };

    const token = await tokenGenerator(tokenObject);
    user.token = token;
    await user.save();
    return {
      id: user.id,
      userType: user.UserType.type,
      name: user.name,
      email: user.email,
      token: user.token,
      seller
    };
  }
}
