const {
  calculateNumberOfCalories,
  restrictedFood,
  getNonRecommendedCategories,
} = require('../functions');
const {BadRequestError} = require('../errors')
const { StatusCodes } = require('http-status-codes');

const calculateCalories = (req,res)=>{
  const {height,currentWeight,desiredWeight,age,bloodType} = req.body
  if (!height||!currentWeight || !desiredWeight || !age || !bloodType){
    throw new BadRequestError('Please provide height, current weight, desired weight, age, and blood type');
  }
  const calories = calculateNumberOfCalories(age,height,currentWeight,desiredWeight)
  const restrictedProducts = restrictedFood(bloodType);
  const nonRecCategories = getNonRecommendedCategories(restrictedProducts)
  res.status(StatusCodes.OK).json({calories,nonRecCategories})
}

module.exports = calculateCalories;