import Joi from 'joi';

const joiUserSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .required()
        .messages({
            'string.base': 'Name string aayirikanam, da!',
            'string.min': 'Name 3 characters ethanam, da!',
            'string.max': 'Name 20 characters kooduthal aakan paadilla, da!',
            'any.required': 'Name venam, da!'
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .lowercase()
        .messages({
            'string.email': 'Valid email idanu, da!',
            'any.required': 'Email venam, da!'
        }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            'string.min': 'Password 8 characters ethanam, da!',
            'string.pattern.base': 'Password-il oru capital letter, number, um special character (@$!%*?&) venam, da!',
            'any.required': 'Password venam, da!'
        }),
    cpassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Confirm password password-um match aakanam, da!',
            'any.required': 'Confirm password venam, da!'
        }),
    isAdmin: Joi.boolean()
        .default(false)
        .optional()
        .messages({
            'boolean.base': 'isAdmin true or false aayirikanam, da!'
        }),
    isBlocked: Joi.boolean()
        .default(false)
        .optional()
        .messages({
            'boolean.base': 'isBlocked true or false aayirikanam, da!'
        }),
    profilePicture: Joi.string()
        .allow('', null)
        .optional()
        .messages({
            'string.base': 'Profile picture URL string aayirikanam, da!'
        }),
    googleId: Joi.string()
        .allow('', null)
        .optional()
        .messages({
            'string.base': 'Google ID string aayirikanam, da!'
        }),
    isPremium: Joi.boolean()
        .default(false)
        .optional()
        .messages({
            'boolean.base': 'isPremium true or false aayirikanam, da!'
        }),
    otp: Joi.string()
        .length(6)
        .pattern(/^[0-9]{6}$/)
        .allow('', null)
        .optional()
        .messages({
            'string.base': 'OTP string aayirikanam, da!',
            'string.length': 'OTP 6 digits aayirikanam, da!',
            'string.pattern.base': 'OTP numbers mathram aayirikanam, da!'
        }),
    otpExpiry: Joi.date()
        .greater('now')
        .allow(null)
        .optional()
        .messages({
            'date.base': 'OTP expiry date aayirikanam, da!',
            'date.greater': 'OTP expiry future-il aayirikanam, da!'
        }),
    isVerified: Joi.boolean()
        .default(false)
        .optional()
        .messages({
            'boolean.base': 'isVerified true or false aayirikanam, da!'
        })
});

export default joiUserSchema;