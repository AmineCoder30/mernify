import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import usersModel from "../models/user.js";

dotenv.config();
const secret = process.env.SECRET_KEY;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await usersModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const image = req.file
    ? `${req.protocol}://${req.get("host")}/${req.file.path}`.replace(
        /\\/g,
        "/"
      )
    : null; // Construct the full image URL

  try {
    const oldUser = await usersModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await usersModel.create({
      username,
      email,
      password: hashedPassword,
      image, // Save the image path to the database
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret);
    res.status(201).json({ result: { ...result._doc, image }, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find().select("username _id image");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
