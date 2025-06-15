const {
  calculateNumberOfCalories,
  restrictedFood,
  getNonRecommendedCategories,
} = require('../functions');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const UserInfo = require('../models/user-info');
const { User } = require('../models/user-model');

const userCalculateCalories = async (req, res) => {
  const { height, currentWeight, desiredWeight, age, bloodType } = req.body;
  
  if (!height || !currentWeight || !desiredWeight || !age || !bloodType) {
    throw new BadRequestError(
      'Please provide height, current weight, desired weight, age, and blood type'
    );
  }

  const user = req.user;
  console.log("Request body received in backend:", req.body);

  const userInfo = await User.findById(user._id);

  if (!userInfo) {
    throw new BadRequestError("User not found!");
  }

  const calories = calculateNumberOfCalories(
    age,
    height,
    currentWeight,
    desiredWeight
  );

  console.log("Calories to be assigned:", calories);

  const restrictedProducts = restrictedFood(bloodType);
  const nonRecCategories = getNonRecommendedCategories(restrictedProducts);

  // ✅ Verifică dacă UserInfo există deja în baza de date
  let existingUserInfo = await UserInfo.findOne({ owner: user._id });

  if (!existingUserInfo) {
    console.log("UserInfo does not exist, creating a new one...");
    existingUserInfo = await UserInfo.create({
      owner: user._id,
      calories: calories.neededCalories, // Salvează doar valoarea numerică
      nonRecCategories
    });
  } else {
    console.log("Updating existing UserInfo...");
    existingUserInfo.calories = calories.neededCalories;
    existingUserInfo.nonRecCategories = nonRecCategories;
    await existingUserInfo.save();
  }

  console.log("UserInfo after update or create:", existingUserInfo);

  return res.status(StatusCodes.OK).json({ 
    userInfo: existingUserInfo, 
    calories: calories.neededCalories,
    nonRecCategories 
  });
};

module.exports = userCalculateCalories;
