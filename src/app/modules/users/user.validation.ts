import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .trim()
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First name should start with a capital letter',
    }),
  lastName: z.string({ required_error: 'Last name is required' }),
});

const orderValidationSchema = z.object({
  productName: z.string({ required_error: 'Product name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
});

const addressValidationSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
});

const userValidationSchema = z.object({
  userId: z.number({ required_error: 'User ID is required' }),
  userName: z.string({ required_error: 'User name is required' }),
  password: z.string({ required_error: 'Password is required' }),
  fullName: fullNameValidationSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z.string({ required_error: 'Email is required' }).email({
    message: 'Invalid email format',
  }),
  isActive: z.boolean({ required_error: 'isActive is required' }),
  hobbies: z.array(z.string({ required_error: 'Hobbies are required' })),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
  isDeleted: z.boolean(),
});

export default userValidationSchema;
