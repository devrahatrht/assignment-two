/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express';
import { UserModel } from '../user.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const hasUser = await UserModel.findOne({ userId });

    if (!hasUser) throw new Error('User not found.');

    await UserModel.findOneAndUpdate(
      { userId },
      { $push: { orders: req.body } },
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export default createOrder;
