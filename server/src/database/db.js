import mongoose from "mongoose";

import { MONGODB_URI } from "../config/index.js";

const connectDB = async () => {
  try {
   

    await mongoose.connect(MONGODB_URI);

    console.log("✅ Successfully connected to Database ");
  } catch (err) {
     console.error('❌ MongoDB Connection Error:', err);
     process.exit(1);
  }
};

export default connectDB;
