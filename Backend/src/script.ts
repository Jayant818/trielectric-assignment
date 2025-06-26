import { Connection } from "./Connection";
import Telemetry from "./telemetry.schema";

const deviceIds = [
  "DEVICE_001",
  "DEVICE_002",
  "DEVICE_003",
  "DEVICE_004",
  "DEVICE_005",
];

function generateRandomTelemetry(deviceId: string) {
  const baseVoltage = 220 + Math.random() * 20 - 10; 
  const baseCurrent = 5 + Math.random() * 10; 

  const voltage =
    Math.round((baseVoltage + Math.sin(Date.now() / 10000) * 5) * 100) / 100;
  const current =
    Math.round((baseCurrent + Math.cos(Date.now() / 8000) * 2) * 100) / 100;

  return {
    device_id: deviceId,
    timestamp: new Date().toISOString(),
    voltage: voltage,
    current: current,
  };
}

async function main() {
  console.log("Starting telemetry data generation...");

  try {
    await Connection();
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    return;
  }

    try {
      for (const deviceId of deviceIds) {
        const telemetryData = generateRandomTelemetry(deviceId);

        await Telemetry.create(telemetryData);
        console.log(
          `Created telemetry for ${deviceId}: V=${telemetryData.voltage}V, I=${telemetryData.current}A`
        );
      }

      console.log(
        `Generated data for ${
          deviceIds.length
        } devices at ${new Date().toISOString()}`
      );
    } catch (error) {
      console.error("An error occurred while pushing to the database:", error);
    }

    await new Promise((r) => setTimeout(r, 10000));
  }
}

main();
