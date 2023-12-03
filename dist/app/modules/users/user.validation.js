"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: 'First name is required' })
        .trim()
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First name should start with a capital letter',
    }),
    lastName: zod_1.z.string({ required_error: 'Last name is required' }),
});
const orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string({ required_error: 'Product name is required' }),
    price: zod_1.z.number({ required_error: 'Price is required' }),
    quantity: zod_1.z.number({ required_error: 'Quantity is required' }),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string({ required_error: 'Street is required' }),
    city: zod_1.z.string({ required_error: 'City is required' }),
    country: zod_1.z.string({ required_error: 'Country is required' }),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number({ required_error: 'User ID is required' }),
    username: zod_1.z.string({
        required_error: 'username is required',
        invalid_type_error: 'Username must be a string',
    }),
    password: zod_1.z.string({ required_error: 'Password is required' }),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number({ required_error: 'Age is required' }),
    email: zod_1.z.string({ required_error: 'Email is required' }).email({
        message: 'Invalid email format',
    }),
    isActive: zod_1.z.boolean({ required_error: 'isActive is required' }),
    hobbies: zod_1.z.array(zod_1.z.string({ required_error: 'Hobbies are required' })),
    address: addressValidationSchema,
    orders: zod_1.z.array(orderValidationSchema).optional(),
});
exports.default = userValidationSchema;
