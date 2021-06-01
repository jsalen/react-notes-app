const userController = {};
const User = require("../models/User");
const UserModel = require("../models/User");

userController.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

userController.getUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.json(user);
};

userController.createUser = async (req, res) => {
  const { username } = req.body;
  const newUser = new UserModel({ username });
  await newUser.save();
  res.json(username);
};

userController.deleteUser = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

module.exports = userController;
