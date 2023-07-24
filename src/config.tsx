import dotenv from "dotenv";
// read.env
// procces.env
dotenv.config();

export default {
  SECRET: process.env.SECRET || "SECRET",
};
