const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Meal = require('../models/mealModel')
const User = require('../models/userModel')
//get goal
const getMeals = asyncHandler(async (req, res) => {

    const meals = await Meal.find({ user: req.user.id })

    res.status(200).json(meals)
})
//make goal
const setMeal = asyncHandler(async (req, res) => {
  if(!req.body.mealName || !req.body.mealDate || !req.body.mealTime ||  !req.body.insulinDose || !req.body.insulinTime  ||!req.body.carbCount) {
    res.status(400)
    throw new Error('please add all fields')
  }

  const meal = await Meal.create({
    user: req.user.id,
    mealName: req.body.mealName,
    mealDate: req.body.mealDate,
    mealTime: req.body.mealTime,
    insulinDose: req.body.insulinDose,
    insulinTime: req.body.insulinTime,
    carbCount: req.body.carbCount
  })
  res.status(200).json({ meal })
}
)
//update goal
const updateMeals = asyncHandler(async (req, res) => {

    const meal = await Goal.findById(req.params.id)

    if (!meal) {
        res.status(400)
        throw new Error('meal not found')
    }

    
    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(meal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized by id')
    }

    const updatedMeal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedMeal)
})
//delete goal
const deleteMeal = asyncHandler(async (req, res) => {
    const meal = await Meal.findById(req.params.id)

    if (!meal) {
        res.status(400)
        throw new Error('goal not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    if(meal.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized by id')
    }


    await meal.deleteOne({ id: req.params.id })
    res.status(200).json({ id: req.params.id })
})
module.exports = {
    getMeals,
    setMeal,
    updateMeals,
    deleteMeal
}