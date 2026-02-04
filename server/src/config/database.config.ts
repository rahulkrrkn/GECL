import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.GECL_MONGO_URI as string, {
      autoIndex: false, // disable auto index in prod
      serverSelectionTimeoutMS: 5000, // fail fast
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // crash app if DB fails
  }
};

export default connectDB;
