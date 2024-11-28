import express = require("express");
import router from "./routes/pr.routes";

const app = express();

app.use("/", router);

export default app;
