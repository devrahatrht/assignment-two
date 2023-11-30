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
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const user_model_1 = require("../user.model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const zodParsedData = user_validation_1.default.parse(user);
        const result = yield user_service_1.userServices.createUserFromDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
// get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsersFromDB();
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'no user found',
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: 'all users fetched successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong!',
            error: error.message,
        });
    }
});
// get single user
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.UserModel.findOne({ userId });
        if (!user)
            throw new Error('User not found.');
        const result = yield user_service_1.userServices.getSingleUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'user fetched successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'user not found',
            error: {
                code: err.code,
                description: 'user not found!',
            },
        });
    }
});
// update user data
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_model_1.UserModel.findOne({ userId });
        if (!user)
            throw new Error('User not found.');
        const users = req.body;
        const result = yield user_service_1.userServices.updateUserFromDB(Number(userId), users);
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result && result.acknowledged ? 'user updated successfully' : result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: {
                code: err.code,
                description: 'user not found',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.deleteUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'user deleted successfully!',
            data: result && result.acknowledged ? null : result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.userControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateSingleUser,
};
