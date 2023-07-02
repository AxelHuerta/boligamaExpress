import mongoose from "mongoose";
import config from "./config";

// funcion que se llama automaticamente
(async () => {
  try {
    mongoose.set("strictQuery", false);

    const db = await mongoose.connect(
      `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER}.kiu6y50.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log("Error en la db: " + error);
  }
})();
