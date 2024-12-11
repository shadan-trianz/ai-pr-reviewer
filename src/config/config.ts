import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  apiUrl: process.env.API_URL,
  port: process.env.PORT,
  dbUri: process.env.DB_URL!,
};
