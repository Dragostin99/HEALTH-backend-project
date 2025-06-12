const { User, userValidationSchema } = require('../models/user-model');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  UnauthenticatedError,
  ConflictError,
} = require('../errors');

const SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = userValidationSchema.validate({ name, email, password });
  if (error) {
    throw new BadRequestError(error.message);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ConflictError('Email in use');
  }

  const newUser = new User({ name, email });
  newUser.setPass(password);

  const payload = { id: newUser._id, email };
  const token = jwt.sign(payload, SECRET, { expiresIn: '7d' });
  newUser.setToken(token);

  await newUser.save();

  res.status(StatusCodes.CREATED).json({
    user: { name: newUser.name, email: newUser.email },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user || !user.isSamePass(password)) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const payload = { id: user._id, email };
  const token = jwt.sign(payload, SECRET, { expiresIn: '7d' });
  user.setToken(token);
  await user.save();

  res.status(StatusCodes.OK).json({
    user: { name: user.name, email },
    token,
  });
};

const logout = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new UnauthenticatedError('Not authorized');
  }
  user.token = null;
  await user.save();
  res.status(StatusCodes.NO_CONTENT).send();
};

const refreshUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  res.status(StatusCodes.OK).json({
    user: { name: user.name, email: user.email },
  });
};

module.exports = {
  register,
  login,
  logout,
  refreshUser,
};
