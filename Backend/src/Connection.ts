import mongoose from "mongoose";

export async function Connection() {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/trielectric"
    );
    console.log("Connected to MongoDB");
    return connection;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }
}
