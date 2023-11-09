const express = require('express')
const router = express.Router()
const { getMeals, setMeal } = require('../controllers/mealController')

const { updateMeals } = require('../controllers/mealController')
const { deleteMeal } = require('../controllers/mealController')
const { protect } = require('../middleware/authMiddleware') //require jwt token to be sent to get data

router.route('/').get(protect, getMeals).post(protect, setMeal) //since get and post have same route we can shorten it to one line
router.route('/:id').put(protect, updateMeals).delete(protect, deleteMeal)




module.exports = router