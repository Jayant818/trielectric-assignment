import mongoose from "mongoose";

const telemetrySchema = new mongoose.Schema({
    device_id: String,
    timestamp: String,
    voltage: Number,
    current:Number,
});

const Telemetry = mongoose.model("Telemetry", telemetrySchema);

export default Telemetry;
