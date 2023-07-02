import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";

// endpoints

//register user
export const registerUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // check if the user exists
    const userFound = await User.findOne({ username: body.username });
    if (userFound)
      return res.status(301).json({ message: "Te user already exists" });

    // encriptation
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(body.password, salt);
    const user = await User.create({
      username: body.username,
      password: hashed,
      credits: 0,
      salt,
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.log("Register error", err);
  }
};
