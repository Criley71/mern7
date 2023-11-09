import axios from "axios";

const API_URL = '/api/goals/'

//create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` //sent as bearer token in page header
    }
  }

  const response = await axios.post(API_URL, goalData, config) //config sends headers
  
  return response.data
}

const getMeals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` //sent as bearer token in page header
    }
  }

  const response = await axios.get(API_URL, config) //config sends headers
  
  return response.data
}

const deleteMeal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` //sent as bearer token in page header
    }
  }
  const response = await axios.delete(`${API_URL}/${goalId}`, config)
}

const goalService = {
  createGoal,
  getMeals,
  deleteMeal,
}
export default goalService