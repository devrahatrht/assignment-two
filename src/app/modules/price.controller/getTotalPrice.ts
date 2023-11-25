import type { Request, Response } from 'express';
import { UserModel } from '../user.model';
import { Order } from '../users/user.interface';

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findOne({ userId });

    if (!user) throw new Error('User not found.');

    const orders = user.orders;

    const totalPrice = orders?.reduce((curr: number, acc: Order) => {
      const total = acc.price * acc.quantity;
      return total + curr;
    }, 0);

    res.send({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export default getTotalPrice;
