import userModel from "../mongoDB/models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).limit(req.query._end);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await userModel.findOne({ email });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) return res.status(200).json(userExists);

    const newUser = await userModel.create({
      name,
      email,
      avatar,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({ _id: id }).populate("allProperties");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, getUserInfoByID, findUser };
