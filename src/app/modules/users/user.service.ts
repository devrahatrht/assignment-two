/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserFromDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};

const updateUserFromDB = async (userId: number, users: any) => {
  if (users && Object.keys(users).length > 0) {
    // Assuming UserModel is a Mongoose model
    const result = await UserModel.updateOne({ userId }, { $set: users });
    return result;
  } else {
    // Handle the case where updatedFields is undefined or empty
    throw new Error('Invalid or empty update fields');
  }
  // const result = await UserModel.updateOne({ userId }, { $set: users });
  // return result;
};

export const userServices = {
  createUserFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
