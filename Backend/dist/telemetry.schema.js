"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const telemetrySchema = new mongoose_1.default.Schema({
    device_id: String,
    timestamp: String,
    voltage: Number,
    current: Number,
});
const Telemetry = mongoose_1.default.model("Telemetry", telemetrySchema);
exports.default = Telemetry;
