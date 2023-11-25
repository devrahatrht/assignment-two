/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response } from 'express';
import { UserModel } from '../user.model';

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findOne({ userId });

    if (!user) throw new Error('User not found.');

    res.send({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: user.orders,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export default getOrders;
