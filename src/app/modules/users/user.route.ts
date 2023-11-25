import express from 'express';
import { userControllers } from './user.controller';
import { orderController } from '../order.controller';
import { priceController } from '../price.controller';

const router = express.Router();

router.post('/users', userControllers.createUser);

router.get('/users', userControllers.getAllUsers);

router.get('/users/:userId', userControllers.getSingleUser);

router.delete('/users/:userId', userControllers.deleteUser);

router.put('/users/:userId', userControllers.updateSingleUser);

router.put('/users/:userId/orders', orderController.createOrder);

router.get('/users/:userId/orders', orderController.getOrders);

router.get('/users/:userId/orders/total-price', priceController.getTotalPrice);

export const userRoutes = router;
