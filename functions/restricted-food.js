const products = require('../assets/products.json')

const restrictedFood = (bloodType)=>{
const numberBloodType= Number(bloodType)
const foodCategorie = [];
products.forEach((p)=>{
  const {categories,groupBloodNotAllowed} = p
if(!categories.includes('drinks') && groupBloodNotAllowed[numberBloodType]===true){
  foodCategorie.push(p)
}
})
return foodCategorie
}

module.exports = restrictedFood

