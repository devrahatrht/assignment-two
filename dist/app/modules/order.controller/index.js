"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const createOrder_1 = __importDefault(require("./createOrder"));
const getOrders_1 = __importDefault(require("./getOrders"));
exports.orderController = {
    createOrder: createOrder_1.default,
    getOrders: getOrders_1.default,
};
