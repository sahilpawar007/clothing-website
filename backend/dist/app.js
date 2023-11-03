"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const ProductRoute_1 = __importDefault(require("./routes/ProductRoute"));
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const errorMiddleware = require("./middlewares/error");
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/v1", UserRoute_1.default);
app.use("/api/v1", ProductRoute_1.default);
app.use("/api/v1", OrderRoute_1.default);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
    });
});
app.use(errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map