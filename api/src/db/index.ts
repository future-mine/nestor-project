export * from "./client";
export * from "./provider";
import { connect } from "mongoose";

export const initDb = async (): Promise<any> => {
  try {
    const db = await connect(
      process.env.MONGO_URL || "mongodb://localhost/xin"
    );
    console.log("DB connected");
    return db;
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};
