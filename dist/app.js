"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/users/user.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', user_route_1.userRoutes);
app.get('/', (req, res) => {
    res.send('Assignment Two Server Running');
});
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route is not found',
    });
});
// global error handler
app.use((error, req, res) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
        });
    }
});
exports.default = app;
