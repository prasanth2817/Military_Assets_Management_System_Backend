import UserModel from "../Models/Users.js";
import Auth from "../Common/Auth.js";

const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    let user = await UserModel.findOne({ userName: userName.toLowerCase() });

    if (user) {
      let hashCompare = await Auth.hashCompare(password, user.password);
      if (hashCompare) {
        const token = Auth.createToken({
          id: user._id,
          userName: user.userName,
          role: user.role,
          base: user.base,
        });
        res.status(200).send({ message: "Login Successful", token });
      } else {
        res.status(400).send({ message: "Invalid Password" });
      }
    } else {
      res.status(404).send({ message: `User ${email} Not Exists` });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, password, role, base } = req.body;
    const existingUser = await UserModel.findOne({
      userName: userName.toLowerCase(),
    });

    if (existingUser) {
      return res
        .status(400)
        .send({ message: `UserName ${userName} already exists` });
    }

    const validRoles = ["Admin", "BaseCommander", "LogisticsOfficer"];
    if (!validRoles.includes(role)) {
      return res.status(400).send({ message: `Invalid role: ${role}` });
    }

    // Create the new user if not found
    const hashedPassword = await Auth.hashPassword(password);
    const newUser = await UserModel.create({
      userName: userName.toLowerCase(),
      password: hashedPassword,
      role,
      base,
    });

    res.status(201).send({
      message: "Account created successfully",
      user: {
        userName: newUser.userName,
        role: newUser.role,
        base: newUser.base,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

export default {
  Login,
  createUser,
};
