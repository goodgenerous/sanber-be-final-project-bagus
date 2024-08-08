import mongoose from "mongoose";
import { DATABASE_URL } from "./env";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      autoIndex: true,
      dbName: "belajar-backend-nodejs",
      connectTimeoutMS: 10000,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to database");
  }
};

export default connect;
