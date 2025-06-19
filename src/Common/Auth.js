import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../Models/Users.js";
dotenv.config();

const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "1d",
    });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
  }
};

const decodeToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const validate = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(400).json({ message: "No token found" });
  try {
    if (token) {
      let payload = decodeToken(token);
      const user = await UserModel.findById(payload.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });
      let currentTime = +new Date() / 1000;
      if (payload.exp > currentTime) {
        req.user = user;
        next();
      } else res.status(400).send({ message: "Token Expired" });
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

const adminGaurd = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "No Token Found" });
  try {
    let payload = decodeToken(token);
    if (payload.role === "Admin") next();
    else res.status(401).send({ message: "Only Admins are allowed" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const verifyRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send({ message: "Forbidden: Access denied" });
    }
  };
};

export default {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validate,
  adminGaurd,
  verifyRole,
};
