import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  apiUrl: process.env.API_URL || "http://localhost:11434/api/generate",
  port: process.env.PORT,
  dbUri: process.env.DB_URL!,
  jwtSecret: process.env.JWT_SECRET,
};
