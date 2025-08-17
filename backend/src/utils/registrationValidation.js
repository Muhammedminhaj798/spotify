import Joi from 'joi';

const joiRegisterSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .required()
        .messages({
            'string.base': 'Name must be a string.',
            'string.min': 'Name must be at least 3 characters long.',
            'string.max': 'Name cannot exceed 20 characters.',
            'any.required': 'Name is required.'
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .lowercase()
        .messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.'
        }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long.',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).',
            'any.required': 'Password is required.'
        }),
    cpassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Confirm password must match the password.',
            'any.required': 'Confirm password is required.'
        }),
    DOB: Joi.date()
        .less('now')
        .required()
        .messages({
            'date.base': 'Date of birth must be a valid date.',
            'date.less': 'Date of birth cannot be in the future.',
            'any.required': 'Date of birth is required.'
        }),
    gender: Joi.string()
        .valid('Man', 'Woman', 'Prefer not to say', 'Non-binary', 'Something else')
        .required()
        .messages({
            'string.base': 'Gender must be a string.',
            'any.only': 'Gender must be either Man , Woman , Prefer not to say , Non-binary ,Something else',
            'any.required': 'Gender is required.'
        })
});

export default joiRegisterSchema;