"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
const telemetry_schema_1 = __importDefault(require("./telemetry.schema"));
const deviceIds = [
    "DEVICE_001",
    "DEVICE_002",
    "DEVICE_003",
    "DEVICE_004",
    "DEVICE_005",
];
function generateRandomTelemetry(deviceId) {
    const baseVoltage = 220 + Math.random() * 20 - 10; // 210-230V
    const baseCurrent = 5 + Math.random() * 10; // 5-15A
    const voltage = Math.round((baseVoltage + Math.sin(Date.now() / 10000) * 5) * 100) / 100;
    const current = Math.round((baseCurrent + Math.cos(Date.now() / 8000) * 2) * 100) / 100;
    return {
        device_id: deviceId,
        timestamp: new Date().toISOString(),
        voltage: voltage,
        current: current,
    };
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting telemetry data generation...");
        try {
            yield (0, Connection_1.Connection)();
            console.log("Connected to database");
        }
        catch (error) {
            console.error("Failed to connect to database:", error);
            return;
        }
        while (true) {
            try {
                // Generate data for all devices
                for (const deviceId of deviceIds) {
                    const telemetryData = generateRandomTelemetry(deviceId);
                    yield telemetry_schema_1.default.create(telemetryData);
                    console.log(`Created telemetry for ${deviceId}: V=${telemetryData.voltage}V, I=${telemetryData.current}A`);
                }
                console.log(`Generated data for ${deviceIds.length} devices at ${new Date().toISOString()}`);
            }
            catch (error) {
                console.error("An error occurred while pushing to the database:", error);
            }
            // Wait 10 seconds before next batch
            yield new Promise((r) => setTimeout(r, 10000));
        }
    });
}
main();
