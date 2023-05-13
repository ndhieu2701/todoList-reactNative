import { comparePassword, hashPassword } from "../config/password.js";
import genarateToken from "../config/generateToken.js";
import User from "../model/User.js";

//[POST] /user/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json("User does not exist!");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid password!");
    delete user.password;
    res.status(200).json({ token: genarateToken(user._id), user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[POST] /user/register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await hashPassword(password);
    const oldUser = await User.findOne({email: email})
    if(oldUser) return res.status(404).json("Email is exist!")
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
    });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json("Email exist!");
    } else {
      res.status(500).json(error.message);
    }
  }
};

//[PUT] /user/update/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { username, password } = req.body;
    const user = await User.findById(id);
    if (password) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch)
        return res.status(404).json("Password cann't be old password");
      const passwordHash = await hashPassword(password);
      password = passwordHash;
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        password: password ? password : user.password,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { login, register, updateUser };
