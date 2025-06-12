function calculateNumberOfCalories(age, height, currentWeight,desiredWeight) {
  const numberAge = Number(age)
  const numberHeight = Number(height)
  const numberCurrentWeight = Number(currentWeight);
  const numberDesiredWeight = Number(desiredWeight);

  const RMB =
    655 + 9.6 * numberCurrentWeight + 1.8 * numberHeight - 4.7 * numberAge;
  const neededCalories  = RMB * 1.9;
  const neededCaloriesForDesiredWeight =
    (655 + 9.6 * numberDesiredWeight + 1.8 * numberHeight - 4.7 * numberAge) *
    1.9;

  return {
    neededCalories : Math.round(neededCalories),
    neededCaloriesForDesiredWeight: Math.round(neededCaloriesForDesiredWeight),
  };
}

module.exports = calculateNumberOfCalories