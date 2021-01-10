import bcrypt from 'bcrypt';

// eslint-disable-next-line import/prefer-default-export
export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

export const isAuthenticate = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}