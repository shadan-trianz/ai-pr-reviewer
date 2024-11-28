import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { config } from "./config";

dotenv.config();

const sequelize = new Sequelize(config.dbUri, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
});

export default sequelize;
