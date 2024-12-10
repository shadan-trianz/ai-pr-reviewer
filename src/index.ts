import app from "./app";
import { config } from "./config/config";
import sequelize from "./config/database";

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully.",
    );

    await sequelize.sync({ force: true }); // Warning: This will drop the table if it exists, so use carefully.
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    // await sequelize.close();
  }
};

syncDatabase();
