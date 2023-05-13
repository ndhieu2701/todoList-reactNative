import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

const comparePassword = async (passwordReq, passwordData) => {
  const isMatch = await bcrypt.compare(passwordReq, passwordData);
  return isMatch;
};

export { hashPassword, comparePassword };
