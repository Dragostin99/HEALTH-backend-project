const { StatusCodes } = require('http-status-codes');
const DailyUserInfo = require('../models/daily-user-info');
const getDate = require('../functions/getDate');
const { UnauthenticatedError } = require('../errors');

const addProduct = async (req, res) => {
  const user = req.user;
  const dailyProduct = req.body;
  const newUserInfo = await DailyUserInfo.create({
    owner: user._id,
    ...dailyProduct,
  });
  return res.status(StatusCodes.OK).json({ dailyUserInfo: newUserInfo });
};

const deleteProduct = async (req, res) => {
  const { _id } = req.user;
  const productId = req.params.productId;
  const product = await DailyUserInfo.findById(productId);
  if (!product) {
    throw new BadRequestError('the provided id dose not exist');
  }

  if (!product.owner._id.equals(_id)) {
    throw new UnauthenticatedError(
      'the provided ID does not correspond to the current user'
    );
  }
  const deletedProduct = await DailyUserInfo.findByIdAndDelete(productId);
  res.status(StatusCodes.OK).json({ msg: 'product removed', deletedProduct });
};

const getDayInfo = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;
  console.log(date);
  const userProducts = await DailyUserInfo.find({ owner: _id });
  const dayProducts = userProducts.filter((p) => {
    // const productDate = new Date(p.date);
    // const reqDay = new Date(date);
    // console.log(reqDay);
    return p.date === date;
    // return productDate === reqDay;
  });

  const totalDayCaloris = dayProducts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.calories;
  }, 0);

  res
    .status(StatusCodes.OK)
    .json({ totalProducts: dayProducts.length, totalDayCaloris, dayProducts });
};

module.exports = { addProduct, deleteProduct, getDayInfo };
