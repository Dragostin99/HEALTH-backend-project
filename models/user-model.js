const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    default: null,
  },
});


userSchema.methods.setPass = function (pass) {
  this.password = bcrypt.hashSync(pass, bcrypt.genSaltSync(6));
};


userSchema.methods.isSamePass = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};

userSchema.methods.setToken = function (token) {
  this.token = token;
};

const User = model('User', userSchema);

const userValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .error(
      new Error(
        'Password must be at least 6 chars, with one letter, one number and one special char'
      )
    )
    .required(),
});

module.exports = {
  User,
  userValidationSchema,
};