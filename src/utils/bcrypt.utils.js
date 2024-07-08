import { genSalt, hash, compare } from 'bcrypt';
const saltRounds = +process.env["SALT_ROUNDS"];

// Function to hash a password
const hashPassword = async (password) => {
  try {
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

// Function to compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await compare(password, hashedPassword);
    return match;
  } catch (err) {
    throw new Error('Error comparing password');
  }
};

export default {
  hashPassword,
  comparePassword
};
