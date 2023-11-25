import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // const result = await userServices.createUserFromDB(userData);

    // res.status(200).json({
    //   success: true,
    //   message: 'User is created successfully',
    //   data: result,
    // });
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await userServices.createUserFromDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error) {
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
  } catch (error) {
    console.log(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'user fetched successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'user not found',
      error: err,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
