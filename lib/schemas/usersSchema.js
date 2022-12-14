import joi from 'joi';

const usersSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
}).with('password', 'confirmPassword');

export default usersSchema;