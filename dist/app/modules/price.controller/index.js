"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceController = void 0;
const getTotalPrice_1 = __importDefault(require("./getTotalPrice"));
exports.priceController = {
    getTotalPrice: getTotalPrice_1.default,
};
