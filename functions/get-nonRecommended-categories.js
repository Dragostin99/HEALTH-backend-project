
const getNonRecommendedCategories = (array)=>{
  const uniqueCategories = [];
array.forEach(product => {
  if (!uniqueCategories.includes(product.categories)) {
    uniqueCategories.push(product.categories);
  }
});
return uniqueCategories
}

module.exports= getNonRecommendedCategories;