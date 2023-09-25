import fs from "fs";
import path from "path";
import express from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";

const app = express();
const logsPath = path.resolve("logs", "access.log");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const accessLogStream = fs.createWriteStream(logsPath, {
  flags: "a",
});
app.use(logger(formatsLogger, { stream: accessLogStream }));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export { app };
