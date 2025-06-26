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
const express_1 = __importDefault(require("express"));
const telemetry_schema_1 = __importDefault(require("./telemetry.schema"));
const Connection_1 = require("./Connection");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/latest-data/:device_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.params.device_id;
    try {
        let data = yield telemetry_schema_1.default.findOne({ device_id: deviceId }, {}, { sort: { timestamp: -1 } });
        res.json({
            data: data,
        });
    }
    catch (error) {
        console.error("An error occurred while fetching latest data:", error);
        res.status(500).send("Internal Server Error");
    }
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, Connection_1.Connection)();
            app.listen(8080, () => {
                console.log("Server is running on http://localhost:8080");
            });
        }
        catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
        }
    });
}
startServer();
