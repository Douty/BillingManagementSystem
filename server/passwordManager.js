import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const hashPass = async (password) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};
export const verifyPass = async (password, hashPass) => {
  const isMatch = await bcrypt.compare(password, hashPass);
  return isMatch;
};
