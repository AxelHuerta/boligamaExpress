import dotenv from "dotenv";
// read .env
// process.env
dotenv.config();

export default {
  MONGO_CLUSTER: process.env.MONGO_CLUSTER || "userdb",
  MONGO_USER: process.env.MONGO_USER || "admin",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
  MONGO_HOST: process.env.MONGO_HOST || "localhost",
  PORT: process.env.PORT || "3000",
  SECRET: process.env.SECRET || "SECRET",
};
