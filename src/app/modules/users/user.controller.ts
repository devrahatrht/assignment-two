/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';
import { UserModel } from '../user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const zodParsedData = userValidationSchema.parse(user);

    const result = await userServices.createUserFromDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong!',
      error: error.message,
    });
  }
};

// get single user

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findOne({ userId });

    if (!user) throw new Error('User not found.');

    const result = await userServices.getSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'user fetched successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'user not found',
      error: {
        code: err.code,
        description: 'user not found!',
      },
    });
  }
};

// update user data

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findOne({ userId });

    if (!user) throw new Error('User not found.');

    const users = req.body;

    const result = await userServices.updateUserFromDB(Number(userId), users);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data:
        result && result.acknowledged ? 'user updated successfully' : result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: err.code,
        description: 'user not found',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'user deleted successfully!',
      data: result && result.acknowledged ? null : result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateSingleUser,
};
