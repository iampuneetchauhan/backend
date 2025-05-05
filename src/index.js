import express from "express";
import cors from "cors";
import router from "./routes/Approutes.js";
import connection from "./config/DB.js";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

const startServer = async () => {
  try {
    await connection(); // Connect to MongoDB first
    app.listen(process.env.PORT||3000, () => {
      console.log("🚀 Server is running on port:", process.env.PORT || 3000);
    });
  } catch (e) {
    console.error("❌ Error in connecting with MongoDB:", e);
  }
};

startServer();
