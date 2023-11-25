import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';
import { UserModel } from '../user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'All users fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findOne({ userId });

    if (!user) throw new Error('User not found.');

    const result = await userServices.getSingleUserFromDB(userId);
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

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findOne({ userId });

    if (!user) throw new Error('User not found.');

    // Get updated fields from the request body or other source
    const users = req.body; // Assuming the updated fields are in the request body

    const result = await userServices.updateUserFromDB(userId, users);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
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

    const result = await userServices.deleteUserFromDB(userId);
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
