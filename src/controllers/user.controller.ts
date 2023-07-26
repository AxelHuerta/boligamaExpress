import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config";

// authentication
const signToken = (_id: string) => {
  return jwt.sign({ _id }, config.SECRET, {
    // expiration time
    expiresIn: 60 * 60 * 24,
  });
};

// endpoints

//register user
export const registerUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // check if the user exists
    const userFound = await User.findOne({ username: body.username });
    if (userFound)
      return res.status(301).json({ message: "The user already exists" });

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

// login user
export const loginUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const userFound = await User.findOne({ username: body.username });
    if (!userFound) {
      res.status(403).send("User or password incorrect");
    } else {
      // compare password
      const isMatch = await bcrypt.compare(body.password, userFound.password);
      if (isMatch) {
        const token = signToken(userFound._id.toString());
        const id = userFound._id;
        const user = { username: userFound.username };
        const approvedUEAs = userFound.approvedUEAs;
        const credits = userFound.credits;

        // NOTE: Al parecer no es necesario devolver el estado
        res.json({
          token,
          user,
          approvedUEAs,
          credits,
        });
      } else {
        res.status(403).send("User or password incorrect");
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// approve UEA
export const approvedUEAs = async (req: Request, res: Response) => {
  const { body } = req;
  const userFound = await User.findOne({ username: body.username });

  if (!userFound) {
    console.log("not found user");
    // NOTE: json is necesary?
    // WARNING: is this code correct?
    return res.status(404).json();
  }

  userFound.approvedUEAs = body.approvedUEAs;
  console.log("user: ", userFound);
  userFound.save();
  res.sendStatus(204);
};
