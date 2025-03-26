import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `------Database Connected Successfully.------ ${dbConnect.connection.host}`
    );
  } catch (error) {
    console.log("Error while connecting to database --- ", error);
    process.exit(1);
  }
};
