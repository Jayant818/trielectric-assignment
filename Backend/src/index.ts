import express from "express";
import Telemetry from "./telemetry.schema";
import { Connection } from "./Connection";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/latest-data/:device_id", async (req, res) => {
  const deviceId = req.params.device_id;
  try {
    let data = await Telemetry.findOne(
      { device_id: deviceId },
      {},
      { sort: { timestamp: -1 } }
    );

    res.json({
      data: data,
    });
  } catch (error) {
    console.error("An error occurred while fetching latest data:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function startServer() {
  try {
    await Connection();

    app.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
